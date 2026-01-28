/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (filter, price range & sort supported)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         example: Puma
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         example: Pants
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         example: 500
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         example: 2000
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by fields (comma separated)
 *         example: price,-createdAt
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/admin/create:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - quantity
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 */

/**
 * @swagger
 * /products/admin/update/{id}:
 *   put:
 *     summary: Update product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated successfully
 */

/**
 * @swagger
 * /products/admin/delete/{id}:
 *   delete:
 *     summary: Delete product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */

/**
 * @swagger
 * /products/with-category:
 *   get:
 *     summary: Get all products with category details
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products fetched successfully with category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 total:
 *                   type: number
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /products/brand:
 *   get:
 *     summary: Get products with category filtered by brand
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand
 *     responses:
 *       200:
 *         description: Products fetched successfully by brand with category
 */

/**
 * @swagger
 * /products/sort:
 *   get:
 *     summary: Get products with category sorted by price
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort products by price ascending (asc) or descending (desc)
 *     responses:
 *       200:
 *         description: Products fetched successfully sorted by price
 */

/**
 * @swagger
 * /products/price-range:
 *   get:
 *     summary: Get products with category filtered by price range
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: Products fetched successfully in the given price range
 */

/**
 * @swagger
 * /products/stats:
 *   get:
 *     summary: Get aggregated product statistics (brand-wise)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product stats fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product stats fetched successfully
 *                 totalBrands:
 *                   type: integer
 *                   example: 3
 *                 stats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: Puma
 *                       totalProducts:
 *                         type: integer
 *                         example: 5
 *                       avgPrice:
 *                         type: number
 *                         example: 1200
 *                       minPrice:
 *                         type: number
 *                         example: 999
 *                       maxPrice:
 *                         type: number
 *                         example: 1599
 *                       totalQuantity:
 *                         type: integer
 *                         example: 15
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
