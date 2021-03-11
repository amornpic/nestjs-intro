import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private prodocts: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();

    const newProdouct = new Product(prodId, title, desc, price);
    this.prodocts.push(newProdouct);

    return prodId;
  }

  getProducts() {
    return [...this.prodocts];
  }

  getSingleProduct(prodId: string) {
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  updateProduct(prodId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(prodId);
    const updateProoduct = { ...product };

    if (title) {
      updateProoduct.title = title;
    }

    if (desc) {
      updateProoduct.description = desc;
    }

    if (price) {
      updateProoduct.price = price;
    }

    this.prodocts[index] = updateProoduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.prodocts.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.prodocts.findIndex((prod) => prod.id === id);
    const product = this.prodocts[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return [product, productIndex];
  }
}
