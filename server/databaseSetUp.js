const { Client } = require('pg');
const { DB } = require('./config');

(async () => {

  const usersTableStmt = `
    CREATE TABLE IF NOT EXISTS users (
      id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      email           VARCHAR(50),      
      password        TEXT,
      firstName       VARCHAR(50),
      lastName        VARCHAR(50),
      google          JSON,
      userName        VARCHAR(50)
    );
  `

  const productsTableStmt = `
    CREATE TABLE IF NOT EXISTS products (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      name            VARCHAR(100)     NOT NULL,
      price           REAL          NOT NULL,
      description     TEXT     NOT NULL,
      img             TEXT     NOT NULL,
      type            VARCHAR(20)  NOT NULL,
      metal           VARCHAR(20)  NOT NULL
    );
  `

  const populateProductsTableStmt = `
    INSERT INTO products(id, name, price, description, img, type, metal)
    SELECT 1, 'Gold Celtic Tree of Life Necklace', 402.55, 'This Celtic Tree of Life Necklace comes in Gold and Sterling Silver. The current selection is made from Solid 10K Gold. Height (excl bail) 20 mm. Width 20 mm.', 'https://cngln.com/media/mageworx/optionfeatures/product/option/value/P/9/P979-Y_1_metal_yellow.jpg', 'necklace', 'gold'
    UNION ALL
    SELECT 2, 'Iced Tennis Solitaire Out VVS Diamond Chain Necklace 10mm 18K Gold Plated', 160, 'This Gold Solitaire Chain is a massive upgrade from a standard tennis chain. Each link is embedded with beautiful hand set diamonds that surround a larger prong set diamond, allowing the stones to shine bright at any angle. This piece is not only guaranteed to hit in any light, its also guaranteed to turn heads!', 'https://i.ebayimg.com/images/g/rVEAAOSw7wxhhEXQ/s-l500.jpg', 'necklace', 'gold'
    UNION ALL
    SELECT 3, '14MM Diamond Cuban Prong Chain - GOLD', 97.99, 'The Luxsy 14mm Diamond Prong Link Chain in 18K Gold. Sharp Simulated Diamond stones (CZ) to keep it durable with a long-lasting VVS diamond shine. A definite head turner. Fade resistant so you wouldnt have to worry about tarnishing. A perfect piece to add to your jewellery collection or to gift someone.', 'https://cdn.shopify.com/s/files/1/0286/4227/9517/products/4_cc1eb487-910f-45be-bca6-36d10d10b310_1600x.jpg?v=1644278734', 'necklace', 'gold'
    UNION ALL
    SELECT 4, '10MM Iced Thorn Iced Cuban Diamond Chain', 76, 'Real silver barbed wire-styled necklace with cuban diamonds that dont stop shinning!', 'https://cdn.shopify.com/s/files/1/0095/1681/0304/products/97ba585ac_1000x.jpg?v=1614733616', 'necklace', 'silver'
    UNION ALL
    SELECT 5, 'Dog Tag Pendant Diamond 20" Cuban Link Chain Necklace Silver Hip Hop Iced Bling', 71.99, 'This DOG TAG pendant comes with Silver Plated cuban link chain with lab made diamonds.', 'https://i.ebayimg.com/images/g/vN4AAOSwh-JeTgtm/s-l500.jpg', 'necklace', 'silver'
    UNION ALL
    SELECT 6, '2.89 Ct Cushion Cut Diamond Mens Signet Ring 925 Sterling Silver/9kt Gold', 343.85, 'Solid Sterling silver signet ring, with a cussion cut diamond 2.89ct is sure to be a stand out item.', 'https://i.ebayimg.com/images/g/5bAAAOSwsQJd17yi/s-l500.jpg', 'ring', 'silver'
    UNION ALL
    SELECT 7, 'Double Row Diamond Ring - White Gold', 49.99, 'Cernuccis double-layered diamond ring exemplifies simplicity at its finest. The hand-placed stones shine like no other and serve as the perfect complimentary piece to any of our other iced out products.', 'https://cdn.shopify.com/s/files/1/2269/6193/products/DoubleRowDiamondRing-silver_700x.jpg?v=1666283935', 'ring', 'silver'
    UNION ALL
    SELECT 8, '5mm Single Layer Diamond Band Ring', 84, 'GLDs Single Layer Diamond Band Ring exemplifies simplicity at its finest. The single row of large (5mm) round cut stones around the band demands attention in itself, without the need to be flashy. Its the perfect complimentary piece. The ring is made up of 100% precious metals made from 925 Silver covered in 3 microns of 18k gold.', 'https://cdn.shopify.com/s/files/1/0718/5347/products/5mm-single-layer-diamond-band-ring-gld-men-the-gld-shop-1_f075f8c8-c052-4e88-9f75-1cf00b228b50_708x708_crop_center.jpg?v=1661773130', 'ring', 'gold'
    UNION ALL
    SELECT 9, 'Streamline Band Ring in Gold', 4315, 'Atolyestone Streamline band ring is an artistic, powerful signature design of brilliance. This elegant ring is handmade with Atolyestone Streamline design motives on 10K,14K and 18K Solid Gold along with handset White Diamond, Black Diamond, Sapphire, Emerald, Ruby and Cubic Zirconia stones. In this modern, powerful ring the motives are in relation to one another, each half of the motives are a mirror image of our Streamline design.', 'https://cdn.shopify.com/s/files/1/0706/0295/products/Streamline-Band-Ring-in-Gold-Yellow-White-Diamond-Pave_1000x.jpg?v=1667832161', 'ring', 'gold'
    UNION ALL
    SELECT 10, '2.00 Ct 14K Yellow Gold Over Mens Round Cut Diamond Wedding Pinky Ring Band', 147.45, '2.00 Ct 14K Yellow Gold Over Mens Round Cut Diamond Wedding Pinky Ring Band,Theme: Special Occasion, Main Stone: Diamond, Clarity: VVS1, Occasion:Engagement/Wedding/Anniversary/Valentines/Gift, Cut: Excellent, Total Carat Weight: 2.00, Metal: Sterling Silver, Metal Finish: 14k Yellow Gold Over, Diamond: SimulatedHandmade Jewellery', 'https://i.etsystatic.com/20670518/r/il/f3a8f3/2649711932/il_1588xN.2649711932_ru92.jpg', 'ring', 'gold'
    UNION ALL
    SELECT 11, 'Bulova Octavia', 429, 'Make a statement with a Bulova Crystal timepiece. Featured in a gold-tone stainless steel case embellished with crystals on the bezel, bracelet and pave dial. Additional features include a multi-function movement, gold-tone stainless bracelet with deployment closure, and water resistant to 30 metres.', 'https://uk.bulova.com/media/catalog/product/b/u/bulova_98c126_catalog.png?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg', 'watches', 'gold'
    UNION ALL
    SELECT 12, 'Helloice Iced Roman Numerals Round Cut Mens Watch in Gold', 71.99, 'Diameter:  43mm, Dial Color:  Yellow Gold, Material:  Stainless Steel& Refined Alloy, Stones:  Standard with AAAAA quality, Buckle/Clasp:   Clasp (Fold-Over), Plated:   18K Gold ', 'https://www.helloice.com/media/catalog/product/cache/877042223109cc2bc0869ffe42af0ed8/6/3/6392a9505a746jpg.jpg', 'watches', 'gold'
    UNION ALL
    SELECT 13, 'Helloice Iced Roman Numerals Round Cut Mens Watch in Silver', 71.99, 'Diameter:  43mm, Dial Color:  silver, Material:  Stainless Steel& Refined Alloy, Stones:  Standard with AAAAA quality, Buckle/Clasp:   Clasp (Fold-Over), Plated:   silver ', 'https://www.helloice.com/media/catalog/product/cache/877042223109cc2bc0869ffe42af0ed8/6/3/6392a9ca11473jpg.jpg', 'watches', 'silver';
  `

  const ordersTableStmt = `
    CREATE TABLE IF NOT EXISTS orders (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      total           INT             NOT NULL,
      status          VARCHAR(50)     NOT NULL,
      userid          INT             NOT NULL,
      created         DATE            NOT NULL,
      modified        DATE            NOT NULL,
      FOREIGN KEY (userid) REFERENCES users(id)
    );
  `

  const orderItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS orderitems (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      created         DATE            NOT NULL,
      orderid         INT             NOT NULL,
      qty             INT             NOT NULL,
      price           INT             NOT NULL,
      productid       INT             NOT NULL,
      name            TEXT     NOT NULL,
      description     TEXT    NOT NULL,
      FOREIGN KEY (orderid) REFERENCES orders(id)
    );
  `

  const cartsTableStmt = `
    CREATE TABLE IF NOT EXISTS carts (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      userid          INT             NOT NULL,
      modified        DATE            NOT NULL,
      created         DATE            NOT NULL,
      FOREIGN KEY (userid) REFERENCES users(id)
    );
  `

  const cartItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS cartitems (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      cartid          INT             NOT NULL,
      productid       INT             NOT NULL,
      qty             INT             NOT NULL,
      FOREIGN KEY (cartid) REFERENCES carts(id),
      FOREIGN KEY (productid) REFERENCES products(id)
    );
  `

  const addressTableStmt = `
    CREATE TABLE IF NOT EXISTS address (
      id               INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      addressline1     INT             NOT NULL,
      addressline2     INT,
      city             INT             NOT NULL,
      county           TEXT,
      postcode         TEXT            NOT NULL,
      userid           INT             NOT NULL
      FOREIGN KEY (userid) REFERENCES users(id)
    );
  `

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT
    });

    await db.connect();

    // Create tables on database
    await db.query(usersTableStmt);
    await db.query(addressTableStmt);
    await db.query(productsTableStmt);
    await db.query(populateProductsTableStmt);
    await db.query(ordersTableStmt);
    await db.query(orderItemsTableStmt);
    await db.query(cartsTableStmt);
    await db.query(cartItemsTableStmt);

    await db.end();

  } catch(err) {
    console.log("ERROR Creating one or more tables: ", err);
  }

})();