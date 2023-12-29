# Project: Frontend for E-commerce Website or Library Management System

The frontend interacts with mock data stored locally in the project. In the full-stack project, this data will be connected to the backend.

Please, do not spend time on creating your own server. use the files that are in the `./public/mock/*` We have the data ready for you. all you need is send an HTTP request to the resource. we also have an example on how to fetch all products and how to add one product. use them as a reference.

## Option 2: E-commerce Website

### Level 1: Basic Requirements

Tech Stack: React, TypeScript, and Redux/Redux Toolkit. Styling: CSS/SASS or MUI.

**Data Sources:**

- Products: id, name, description, categories, variants, sizes
- Categories: id, name
- Orders: id, productId, userId, purchasedAt
- Users: id, firstName, lastName, email, password, role (visitor or admin)

**Pages to Create:**

1. [x] Home page (list all the products)
2. [x] Product page (contain the details of a product)
3. [x] Admin page

**Functionalities for a Visitor:**

- [x] Get list of products
- [x] Filter products by categories or price
- [x] Search products by name
- [x] Add products to a cart
- [x] Remove products from a cart

**Functionalities for an Admin:**

- [x] Add a new product, update info of a product, remove a product

### Level 2: Additional Requirements

**Authentication:**

- [x] Implement register and login functionality via email and password
- [x] Protect the routes based on login and admin status

**Functionalities for an Admin:**

- [x] list all users, [] delete or block a user.
- [x] list all orders
- [x] Add a new category, update info of a category, remove a category

**Form Validation:**

- [] Implement form validation.

### Level 3: Bonus Requirement (Optional)

If you have a higher skill level and finish the previous requirements before the deadline, you can tackle the following bonus tasks:

- [] Messages, show loading, success, and error messages (e.g., when loading products list or adding new product)
- [] Implement pagination feature
- [x] Task Create a Profile Page (only available if user logs in), implement editing user profile feature (user can change first name, last name)

- Peer Review:
- Review the code and implementation of 2 assignments from other participants.
- Provide constructive feedback and suggestions for improvement.

`Please note that the bonus requirements and reviews are optional and can be completed if you have additional time and advanced skills.`

Happy coding!
