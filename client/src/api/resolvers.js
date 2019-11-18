import gql from "graphql-tag";

export const GET_CART_ITEMS = gql`
  query Cart {
    cart @client {
      id
      name
      price
      image
      quantity
    }
  }
`;
/*
const GET_CART_ITEM = gql`
  query CartItem($id: Int!) {
    cart(id: $id) @client {
      id
      name
      price
      image
      quantity
    }
  }
`;*/

export const resolvers = {
  Query: {
    getCart: (_, args, { cache }) => {
      try {
        return cache.readQuery({ query: GET_CART_ITEMS });
      } catch {
        return {
          cart: []
        };
      }
    }
  },
  Mutation: {
    addToCart: (parent, { product }, { cache }) => {
      let previous = {
        cart: []
      };
      /* check for existing items -smh this is easier with redux */
      product.quantity = 1;
      try {
        previous = Object.assign(
          {},
          cache.readQuery({ query: GET_CART_ITEMS })
        );

        let prevProduct = previous.cart.find(item => item.id === product.id);
        if (prevProduct) {
          previous.cart = previous.cart.filter(
            item => item.id !== prevProduct.id
          );
          product.quantity = prevProduct.quantity + 1;
        }
      } catch (e) {}

      /* set the new item */
      const data = {
        cart: [...previous.cart, { ...product, __typename: "Product" }]
      };

      /*  can also do cache.writeQuery({ query, data }) for data shape validation*/
      cache.writeData({
        data
      });

      console.log(data);

      return data;
    },
    addManyToCart: (parent, { product, quantity }, { cache }) => {
      let previous = {
        cart: []
      };

      /* check for existing items -smh this is easier with redux */
      product.quantity = quantity;
      try {
        previous = Object.assign(
          {},
          cache.readQuery({ query: GET_CART_ITEMS })
        );
        let prevProduct = previous.cart.find(item => item.id === product.id);
        if (prevProduct) {
          previous.cart = previous.cart.filter(
            item => item.id !== prevProduct.id
          );
        }
      } catch (e) {}

      /* set the new item */

      if (quantity === 0) {
        const data = {
          cart: [...previous.cart]
        };
        cache.writeData({
          data
        });
        return data;
      }
      const data = {
        cart: [...previous.cart, { ...product, __typename: "Product" }]
      };
      cache.writeData({
        data
      });
      return data;
    },
    removeOneFromCart: (parent, { product }, { cache }) => {
      let previous = {
        cart: []
      };
      /* check for existing items -smh this is easier with redux */
      debugger;

      try {
        previous = Object.assign(
          {},
          cache.readQuery({ query: GET_CART_ITEMS })
        );

        let prevProduct = previous.cart.find(item => item.id === product.id);
        if (prevProduct) {
          previous.cart = previous.cart.filter(
            item => item.id !== prevProduct.id
          );
          product.quantity = prevProduct.quantity - 1;
        }
      } catch (e) {}

      /* set the new item */
      if (product.quantity < 1) {
        const data = {
          cart: [...previous.cart]
        };
        cache.writeData({
          data
        });

        console.log("removed", data);
        return data;
      }
      const data = {
        cart: [...previous.cart, { ...product, __typename: "Product" }]
      };

      cache.writeData({
        data
      });

      console.log("minus 1", data);

      return data;
    }
  }
};
