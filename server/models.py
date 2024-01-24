from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    clothes = db.relationship('Clothes', backref='user', lazy=True)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    clothes = db.relationship('Clothes', backref='category', lazy=True)
class Clothes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    price = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    brand_id = db.Column(db.Integer, db.ForeignKey('brand.id'))
    sizes = db.relationship('Size', secondary='clothes_sizes', backref=db.backref('clothes', lazy=True))
    colors = db.relationship('Color', secondary='clothes_colors', backref=db.backref('clothes', lazy=True))

class Brand(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    clothes = db.relationship('Clothes', backref='brand', lazy=True)

class Size(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class Color(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    clothes_id = db.Column(db.Integer, db.ForeignKey('clothes.id'))

clothes_sizes = db.Table('clothes_sizes',
    db.Column('clothes_id', db.Integer, db.ForeignKey('clothes.id'), primary_key=True),
    db.Column('size_id', db.Integer, db.ForeignKey('size.id'), primary_key=True)
)

clothes_colors = db.Table('clothes_colors',
    db.Column('clothes_id', db.Integer, db.ForeignKey('clothes.id'), primary_key=True),
    db.Column('color_id', db.Integer, db.ForeignKey('color.id'), primary_key=True)
)
