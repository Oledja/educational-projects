interface Order {
  customer_id: string;
  employee_id: number;
  freight: number;
  order_date: Date;
  order_id: number;
  product_id: string;
  required_date: Date;
  ship_address: string;
  ship_city: string;
  ship_country: string;
  ship_name: string;
  ship_postal_code: number;
  ship_region: string;
  ship_via: string;
  ship_via_company_name: string;
  shipped_date: Date;
  total_products: number;
  total_products_discount: number;
  total_products_items: number;
  total_products_price: number;
}

export default Order;
