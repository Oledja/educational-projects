const GET_ALL_CUSTOMERS = `
SELECT 
  customer_id, 
  company_name, 
  contact_name, 
  contact_title, 
  address, 
  city, 
  postal_code, 
  region, 
  country, 
  phone, 
  fax 
FROM 
  customers
`;

const GET_CUSTOMER_BY_ID = `
SELECT 
  customer_id, 
  company_name, 
  contact_name, 
  contact_title, 
  address, 
  city, 
  postal_code, 
  region, 
  country, 
  phone, 
  fax 
FROM 
  customers 
WHERE 
  customers.customer_id = $1
`;

const GET_CUSTOMERS_BY_FILTER = `
SELECT 
  customer_id, 
  company_name, 
  contact_name, 
  contact_title, 
  address, 
  city, 
  region, 
  postal_code, 
  country, 
  phone, 
  fax 
FROM 
  customers 
WHERE 
  company_name ILIKE $1 
  OR contact_name ILIKE $1 
  OR contact_title ILIKE $1 
  OR address ILIKE $1
`;

const GET_ALL_EMPLOYEES = `
SELECT 
  report.employee_id AS report_employee_id, 
  CONCAT(report.first_name, ' ', report.last_name) AS report_full_name, 
  report.title AS report_title, 
  report.title_of_courtesy AS report_title_of_courtesy, 
  report.birth_date AS report_birth_date, 
  report.hire_date AS report_hire_date, 
  report.address AS report_address, 
  report.city AS report_city, 
  report.postal_code AS report_postal_code, 
  report.country AS report_country, 
  report.home_phone AS report_home_phone, 
  report.extension AS report_extension, 
  report.notes AS report_notes, 
  e.employee_id, 
  CONCAT(e.first_name, ' ', e.last_name) AS full_name, 
  e.title, 
  e.title_of_courtesy, 
  e.birth_date, 
  e.hire_date, 
  e.address, 
  e.city, 
  e.postal_code, 
  e.country, 
  e.home_phone, 
  e.extension, 
  e.notes 
FROM 
  employees AS e 
LEFT JOIN employees AS report ON e.reports_to = report.employee_id
`;

const GET_EMPLOYEES_BY_ID = `
SELECT 
  report.employee_id AS report_employee_id, 
  CONCAT(report.first_name, ' ', report.last_name) AS report_full_name, 
  report.title AS report_title, 
  report.title_of_courtesy AS report_title_of_courtesy, 
  report.birth_date AS report_birth_date, 
  report.hire_date AS report_hire_date, 
  report.address AS report_address, 
  report.city AS report_city, 
  report.postal_code AS report_postal_code, 
  report.country AS report_country, 
  report.home_phone AS report_home_phone, 
  report.extension AS report_extension, 
  report.notes AS report_notes, 
  e.employee_id, 
  CONCAT(e.first_name, ' ', e.last_name) AS full_name, 
  e.title, 
  e.title_of_courtesy, 
  e.birth_date, 
  e.hire_date, 
  e.address, 
  e.city, 
  e.postal_code, 
  e.country, 
  e.home_phone, 
  e.extension, 
  e.notes 
FROM 
  employees AS e 
  LEFT JOIN employees AS report ON e.reports_to = report.employee_id 
WHERE 
  e.employee_id = $1
`;

const GET_ALL_ORDERS = `
SELECT 
  SUM(od.unit_price * od.discount * od.quantity) AS total_products_discount, 
  SUM(od.unit_price * od.quantity) AS total_products_price, 
  SUM(od.quantity) AS total_products_items, 
  COUNT(od.order_id) AS total_products, 
  o.order_id, 
  customer_id, 
  employee_id, 
  order_date, 
  required_date, 
  shipped_date, 
  ship_via, 
  freight, 
  ship_name, 
  ship_address, 
  ship_city, 
  ship_region, 
  ship_postal_code, 
  ship_country 
FROM 
  orders AS o, 
  order_details AS od, 
  shippers AS s 
WHERE 
  od.order_id = o.order_id 
  AND o.ship_via = s.shipper_id 
GROUP BY 
  o.order_id 
ORDER By 
  o.order_id
`;

const GET_ORDER_BY_ID = `
SELECT 
  SUM(od.unit_price * od.discount * od.quantity) AS total_products_discount, 
  SUM(od.unit_price * od.quantity) AS total_products_price, 
  SUM(od.quantity) AS total_products_items, 
  COUNT(od.order_id) AS total_products, 
  s.company_name AS ship_via_company_name, 
  o.order_id, 
  customer_id, 
  employee_id, 
  order_date, 
  required_date, 
  shipped_date, 
  ship_via, 
  freight, 
  ship_name, 
  ship_address, 
  ship_city, 
  ship_region, 
  ship_postal_code, 
  ship_country 
FROM 
  orders AS o, 
  order_details AS od, 
  shippers AS s 
WHERE 
  od.order_id = o.order_id 
  AND o.order_id = $1 
  AND o.ship_via = s.shipper_id 
GROUP BY 
  s.shipper_id, 
  o.order_id 
ORDER By 
  o.order_id
`;

const GET_ORDER_PRODUCTS = `
SELECT 
  p.product_name, 
  quantity, 
  od.unit_price, 
  od.quantity * od.unit_price AS total_products_price, 
  discount 
FROM 
  order_details AS od, 
  products AS p 
WHERE 
  od.product_id = p.product_id 
  AND od.order_id = $1
`;

const GET_ALL_PRODUCTS = `
SELECT 
  product_id, 
  product_name, 
  products.supplier_id, 
  category_id, 
  quantity_per_unit, 
  unit_price, 
  units_in_stock, 
  units_on_order, 
  reorder_level, 
  discontinued, 
  suppliers.company_name AS supplier_name 
FROM 
  products, 
  suppliers 
WHERE 
  suppliers.supplier_id = products.supplier_id
`;

const GET_PRODUCTS_BY_ID = `
SELECT 
  product_id, 
  product_name, 
  products.supplier_id, 
  category_id, 
  quantity_per_unit, 
  unit_price, 
  units_in_stock, 
  units_on_order, 
  reorder_level, 
  discontinued, 
  suppliers.company_name AS supplier_name 
FROM 
  products, 
  suppliers 
WHERE 
  suppliers.supplier_id = products.supplier_id 
  AND product_id = $1
`;

const GET_PRODUCTS_BY_FILTER = `
SELECT 
  product_id, 
  product_name, 
  supplier_id, 
  category_id, 
  quantity_per_unit, 
  unit_price, 
  units_in_stock, 
  units_on_order, 
  reorder_level, 
  discontinued 
FROM 
  products 
WHERE 
  product_name ILIKE $1
`;

const GET_ALL_SUPPLIERS = `
SELECT 
  supplier_id, 
  company_name, 
  contact_name, 
  contact_title, 
  address, 
  city, 
  region, 
  postal_code, 
  country, 
  phone, 
  fax, 
  homepage 
FROM 
  suppliers
`;

const GET_SUPPLIER_BY_ID = `
SELECT 
  supplier_id, 
  company_name, 
  contact_name, 
  contact_title, 
  address, 
  city, 
  region, 
  postal_code, 
  country, 
  phone, 
  fax, 
  homepage 
FROM 
  suppliers 
WHERE 
  supplier_id = $1
`;

export {
  GET_ALL_CUSTOMERS,
  GET_CUSTOMER_BY_ID,
  GET_CUSTOMERS_BY_FILTER,
  GET_ALL_EMPLOYEES,
  GET_EMPLOYEES_BY_ID,
  GET_ALL_ORDERS,
  GET_ORDER_BY_ID,
  GET_ORDER_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_ID,
  GET_PRODUCTS_BY_FILTER,
  GET_ALL_SUPPLIERS,
  GET_SUPPLIER_BY_ID,
};
