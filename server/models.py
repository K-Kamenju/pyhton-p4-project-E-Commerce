from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    products = db.relationship('Product', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)
    cart_items = db.relationship('Cart', backref='user', lazy=True)

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self._password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self._password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'products': [product.to_dict() for product in self.products],
            'reviews': [review.to_dict() for review in self.reviews],
            'cart_items': [cart_item.to_dict() for cart_item in self.cart_items]
        }

    def __repr__(self):
        return f'<User {self.email}>'

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Float)
    image_url = db.Column(db.String)
    stock_quantity = db.Column(db.Integer)
    category = db.Column(Enum('men', 'women', 'kids', name='category_enum'), nullable=False)
    available_sizes = db.Column(db.String) 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    reviews = db.relationship('Review', backref='product', lazy=True)
    cart_items = db.relationship('Cart', backref='product', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'rating': self.calculate_average_rating(),
            'image_url': self.image_url,
            'stock_quantity': self.stock_quantity,
            'category': self.category,
            'available_sizes': self.available_sizes.split(',') if self.available_sizes else [],
            'user_id': self.user_id,
            'reviews': [review.to_dict() for review in self.reviews]
        }

    def calculate_average_rating(self):
        total_rating = sum(review.rating for review in self.reviews)
        return total_rating / len(self.reviews) if self.reviews else 0

    def set_available_sizes(self, sizes_list):
        self.available_sizes = ','.join(sizes_list)

    def __repr__(self):
        return f'<Product {self.title}>'

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'rating': self.rating,
            'user_id': self.user_id,
            'product_id': self.product_id
        }

    def __repr__(self):
        return f'<Review for Product ID {self.product_id}>'

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'product': self.product.to_dict() if self.product else None
        }

    def __repr__(self):
        return f'<Cart Item {self.id}>'
