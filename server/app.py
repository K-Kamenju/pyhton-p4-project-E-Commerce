from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User, Product, Review, Cart
import secrets

secret_key = secrets.token_urlsafe(32)

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://kamenju:exqOPdmsfEV2oSnNuQHiKR2MpkS1Nyod@dpg-cmperracn0vc73cnp5m0-a.oregon-postgres.render.com/market_973s'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT configuration
app.config['JWT_SECRET_KEY'] = secret_key

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# ... existing routes for /signup and /login ...

@app.route('/')
def index():
    return jsonify({'message': 'Welcome to the Market API'})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return make_response(jsonify({'message': 'Missing name, email, or password'}), 400)

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return make_response(jsonify({'message': 'User already exists'}), 409)

    new_user = User(name=name, email=email, password=password)  # Set password directly
    db.session.add(new_user)
    db.session.commit()

    return make_response(jsonify({'message': 'User created successfully'}), 201)

@app.route('/login', methods=['POST'])
@jwt_required(optional=True)
def login():
    current_user = get_jwt_identity()
    if current_user:
        return make_response(jsonify({'message': 'You are already logged in'}), 403)

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return make_response(jsonify({'message': 'Missing email or password'}), 400)

    user = User.query.filter_by(email=email).first()
    if user and user.verify_password(password):
        access_token = create_access_token(identity=email)
        return make_response(jsonify({'message': 'Login successful', 'access_token': access_token}), 200)
    else:
        return make_response(jsonify({'message': 'Invalid credentials'}), 401)

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@app.route('/api/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())

@app.route('/product/<int:product_id>/reviews', methods=['GET'])
def get_product_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    return jsonify([review.to_dict() for review in reviews])

@app.route('/product/<int:product_id>/review', methods=['POST'])
@jwt_required()
def post_review(product_id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return make_response(jsonify({'message': 'User not found'}), 404)

    data = request.get_json()
    content = data.get('content')
    rating = data.get('rating')

    if not content or rating is None:
        return make_response(jsonify({'message': 'Missing content or rating'}), 400)

    new_review = Review(content=content, rating=rating, user_id=user.id, product_id=product_id)
    db.session.add(new_review)
    db.session.commit()

    return make_response(jsonify({'message': 'Review added successfully'}), 201)

@app.route('/user/products', methods=['GET'])
@jwt_required()
def get_user_products():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return make_response(jsonify({'message': 'User not found'}), 404)

    user_products = Product.query.filter_by(user_id=user.id).all()
    return jsonify([product.to_dict() for product in user_products])

@app.route('/api/user', methods=['GET'])
@jwt_required()
def get_user_info():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user.to_dict())

@app.route('/api/products/featured', methods=['GET'])
def get_featured_product():
    # Logic to retrieve a featured product
    featured_product = Product.query.first()  # Example: getting the first product
    return jsonify(featured_product.to_dict())

@app.route('/api/products', methods=['GET'])
def get_products_by_criteria():
    criteria = request.args.get('criteria')
    if criteria == 'highest_rated':
        products = Product.query.order_by(Product.rating.desc()).limit(5).all()
    elif criteria == 'new_arrivals':
        products = Product.query.order_by(Product.created_at.desc()).limit(5).all()
    elif criteria == 'top_picks':
        products = Product.query.order_by(Product.price.desc()).limit(5).all()
    else:
        products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@app.route('/api/products/category/<string:category_name>', methods=['GET'])
def get_products_by_category(category_name):
    products = Product.query.filter_by(category=category_name).all()
    return jsonify([product.to_dict() for product in products])

@app.route('/api/products', methods=['POST'])
@jwt_required()
def post_product():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return make_response(jsonify({'message': 'User not found'}), 404)

    data = request.get_json()
    # Convert list of sizes into a comma-separated string
    available_sizes = ','.join(data.get('available_sizes', []))

    new_product = Product(
        title=data.get('title'),
        description=data.get('description'),
        price=data.get('price'),
        category=data.get('category'),
        image_url=data.get('image_url'),
        available_sizes=available_sizes,  # Save as a string
        user_id=user.id
    )
    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201

@app.route('/api/cart', methods=['GET'])
@jwt_required()
def get_cart_items():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    cart_items = Cart.query.filter_by(user_id=user.id).all()
    return jsonify([item.to_dict() for item in cart_items])

@app.route('/api/cart/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_cart_item(item_id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    cart_item = Cart.query.get(item_id)
    if not cart_item or cart_item.user_id != user.id:
        return jsonify({'message': 'Cart item not found'}), 404

    data = request.get_json()
    cart_item.quantity = data.get('quantity', cart_item.quantity)
    db.session.commit()
    return jsonify(cart_item.to_dict())

@app.route('/api/cart/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_cart_item(item_id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    cart_item = Cart.query.get(item_id)
    if not cart_item or cart_item.user_id != user.id:
        return jsonify({'message': 'Cart item not found'}), 404

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({'message': 'Cart item deleted successfully'})

@app.route('/api/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    if not product_id:
        return jsonify({'message': 'Missing product ID'}), 400

    cart_item = Cart.query.filter_by(user_id=user.id, product_id=product_id).first()
    if cart_item:
        cart_item.quantity += quantity
    else:
        new_cart_item = Cart(user_id=user.id, product_id=product_id, quantity=quantity)
        db.session.add(new_cart_item)
    db.session.commit()

    return jsonify({'message': 'Added to cart successfully'})

@app.route('/api/product/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return make_response(jsonify({'message': 'User not found'}), 404)

    product = Product.query.get_or_404(product_id)
    if product.user_id != user.id:
        return make_response(jsonify({'message': 'Not authorized to delete this product'}), 403)

    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), 200

@app.route('/api/product/<int:product_id>', methods=['PATCH'])
@jwt_required()
def update_product(product_id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    product = Product.query.get_or_404(product_id)
    if product.user_id != user.id:
        return jsonify({'message': 'Not authorized to update this product'}), 403

    data = request.get_json()
    product.title = data.get('title', product.title)
    product.price = data.get('price', product.price)
    product.description = data.get('description', product.description)
    product.category = data.get('category', product.category)
    product.image_url = data.get('image_url', product.image_url)
    product.available_sizes = data.get('available_sizes', product.available_sizes)

    db.session.commit()
    return jsonify({'message': 'Product updated successfully', 'product': product.to_dict()}), 200


if __name__ == '__main__':
    app.run(debug=True)
