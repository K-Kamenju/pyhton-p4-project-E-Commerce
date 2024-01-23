from app import db
from models import User
from models import Product
from models import Order
from models import Review
from models import OrderProduct



def seed_data():
    db.drop_all()
    db.create_all()

    user1 = User(username='john_doe')
    user2 = User(username='jane_doe')

    product1 = Product(name='Widget', description='A useful widget', poster=user1)
    product2 = Product(name='Gadget', description='An interesting gadget', poster=user2)

    order1 = Order(user=user1)
    order2 = Order(user=user2)

    review1 = Review(content='Great widget!', author=user1, products=[product1])
    review2 = Review(content='Love this gadget.', author=user2, products=[product2])

    order_product1 = OrderProduct(order=order1, product=product1, quantity=2)
    order_product2 = OrderProduct(order=order2, product=product2, quantity=3)

    db.session.add_all([user1, user2, product1, product2, order1, order2, review1, review2, order_product1, order_product2])
    db.session.commit()