from flask import Flask ,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from models import User
from models import Product


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


@app.route('/')
def index():
    return "Welcome to the Flask App!"
# Create a new user
@app.route('/users', methods=['POST'])
def create_user():
    username = request.json.get('username')
    if not username:
        return jsonify({'error': 'Missing username'}), 400
    new_user = User(username=username)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'id': new_user.id, 'username': new_user.username}), 201

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username} for user in users])

# Create a new product
@app.route('/products', methods=['POST'])
def create_product():
    name = request.json.get('name')
    description = request.json.get('description')
    poster_id = request.json.get('poster_id')
    if not all([name, description, poster_id]):
        return jsonify({'error': 'Missing product data'}), 400
    new_product = Product(name=name, description=description, poster_id=poster_id)
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'id': new_product.id, 'name': new_product.name}), 201

# Get all products
@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'id': product.id, 'name': product.name, 'description': product.description} for product in products])



if __name__ == '__main__':
    app.run(debug=True)
