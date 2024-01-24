from app import db
from models import User, Category, Clothes, Brand, Size, Color, Review, clothes_sizes, clothes_colors

def seed_db():
    db.drop_all()
    db.create_all()

    # Create users
    user1 = User(username='alice')
    user2 = User(username='bob')

    # Create categories
    category1 = Category(name='T-Shirts')
    category2 = Category(name='Jeans')
    category3 = Category(name='Dresses')

    # Create brands
    brand1 = Brand(name='BrandA')
    brand2 = Brand(name='BrandB')

    # Create sizes
    sizeS = Size(name='S')
    sizeM = Size(name='M')
    sizeL = Size(name='L')

    # Create colors
    colorRed = Color(name='Red')
    colorBlue = Color(name='Blue')
    colorGreen = Color(name='Green')

    # Create clothes
    clothes1 = Clothes(name='Cool T-Shirt', description='A very cool T-Shirt', price=19.99, user=user1, category=category1, brand=brand1)
    clothes2 = Clothes(name='Blue Jeans', description='Comfortable blue jeans', price=39.99, user=user2, category=category2, brand=brand2)
    clothes3 = Clothes(name='Summer Dress', description='Perfect for the summer', price=29.99, user=user1, category=category3, brand=brand1)

    # Assign sizes and colors to clothes
    clothes1.sizes.extend([sizeS, sizeM])
    clothes1.colors.extend([colorRed, colorGreen])
    clothes2.sizes.extend([sizeM, sizeL])
    clothes2.colors.extend([colorBlue])
    clothes3.sizes.extend([sizeS, sizeM])
    clothes3.colors.extend([colorGreen, colorRed])

    # Create reviews
    review1 = Review(content='Great quality!', user=user1, clothes=clothes1)
    review2 = Review(content='Loved the color.', user=user2, clothes=clothes2)

    # Add to session and commit
    db.session.add_all([user1, user2, category1, category2, category3, brand1, brand2, sizeS, sizeM, sizeL, colorRed, colorBlue, colorGreen, clothes1, clothes2, clothes3, review1, review2])
    db.session.commit()

if __name__ == '__main__':
    seed_db()



