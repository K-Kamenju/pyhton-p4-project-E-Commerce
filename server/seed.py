from faker import Faker
from models import db, User, Product, Review
from app import app
import random

def seed_data():
    fake = Faker()

    # Seed Users
    users = []
    for _ in range(20):
        user = User(
            name=fake.name(),
            email=fake.email(),
            password=fake.password()
        )
        db.session.add(user)
        users.append(user)
    
    db.session.commit()

    # Seed Products
    categories = ['men', 'women', 'kids']
    sizes = ['S', 'M', 'L', 'XL', 'XXL']  # Example sizes
    for _ in range(50):
        user = random.choice(users)
        available_sizes = random.sample(sizes, k=random.randint(1, len(sizes)))  # Randomly select available sizes

        product = Product(
            title=fake.catch_phrase(),
            description=fake.text(),
            price=round(random.uniform(100, 1000), 0),
            stock_quantity=random.randint(0, 100),
            user_id=user.id,
            category=random.choice(categories),
            available_sizes=','.join(available_sizes),  # Join sizes as a comma-separated string
            image_url='https://via.placeholder.com/500'  # Corrected line
        )
        db.session.add(product)
    
    db.session.commit()

    # Seed Reviews
    products = Product.query.all()
    for product in products:
        num_reviews = random.randint(1, 5)
        for _ in range(num_reviews):
            review = Review(
                content=fake.text(),
                rating=round(random.randint(1, 5), 2),
                user_id=random.choice(users).id,
                product_id=product.id
            )
            db.session.add(review)
        
        db.session.commit()

        # Recalculate rating for each product
        product.rating = product.calculate_average_rating()
        db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        seed_data()
        print("Database seeded successfully!")
