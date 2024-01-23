from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from app import db
from datetime import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    orders = db.relationship('Order', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='author', lazy=True)
    posted_products = db.relationship('Product', backref='poster', lazy=True)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    order_products = db.relationship('OrderProduct', backref='order', lazy=True)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    poster_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    order_details = db.relationship('OrderProduct', backref='product', lazy=True)
    reviews = db.relationship('Review', secondary='review_product', backref=db.backref('products', lazy=True))

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class OrderProduct(db.Model):
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)

# Association table for the many-to-many relationship between reviews and products
review_product = db.Table('review_product',
    db.Column('review_id', db.Integer, db.ForeignKey('review.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'), primary_key=True)
)