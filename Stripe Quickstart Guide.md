# Stripe Quickstart Guide

This guide will walk you through the basics of integrating Stripe into your application, including setting up payments, handling successful transactions asynchronously, working with prebuilt checkout forms, and understanding different transaction statuses. The prerequis is the you have a Stripe account

## Why Stripe
1. Easy to use, there is a python library, developer firendly
2. They provide the UI
3. The pricing is not bad
4. Test easly, just use the follow card number 42424 * 4 
 
## How does it work?
Stripe collect the payment details but it does not share it with you. It gives you a token, so if you want to charge the user 
you give Stripe the token. The token will be included in the form used for paying. This is work when you nest the scripe script inside the form.
You send stripe the token and the amount and stripe will be able to charge the user.
```python
post method
data = request.get_json()


```

## After payment: receiving order data


Creating our OrderModel
Many-to-many relationships with SQLAlchemy
Using the Association Object in our Resource
Charging orders with Stripe
Calculating the amount and description
Testing our OrderResource
Creating a way to view existing orders
When things go wrong: error handling in Stripe
Security considerations in payments
Conclusion of this section































## Introduction to Stripe

Stripe is a payment processing platform that allows businesses to accept payments over the internet. It provides APIs and tools that enable developers to integrate payment processing into their applications seamlessly.



## Getting Started

To get started with Stripe, follow these steps:

1. **Sign up for a Stripe account:** Go to [Stripe's website](https://stripe.com) and sign up for an account. Once registered, you'll receive API keys that you'll use to authenticate your requests to Stripe's API.

2. **Install the Stripe SDK:** Depending on your programming language and platform, you can install the Stripe SDK using package managers like npm for Node.js, pip for Python, or Composer for PHP.

3. **Configure your API keys:** Use your Stripe dashboard to find your API keys. You'll typically have both a test mode and live mode key. During development, use the test mode key to avoid processing real transactions.

4. **Integrate Stripe into your application:** Follow the documentation provided by Stripe to integrate their SDK into your application. This typically involves initializing the Stripe object with your API keys and handling user interactions to collect payment information.

## Handling Successful Transactions

To ensure actions are taken only after a transaction has passed successfully, you should use Stripe's webhook feature. Webhooks are HTTP callbacks that notify your application of events, such as successful payments or failed charges.

Here's how to handle successful transactions asynchronously using webhooks:

1. **Set up webhook endpoints:** In your Stripe dashboard, configure webhook endpoints for the events you want to listen to, such as `checkout.session.completed`.

2. **Implement webhook handler:** In your application backend, implement a webhook handler to receive and process events sent by Stripe. This handler should verify the event's signature to ensure it comes from Stripe and then take appropriate actions, such as updating the database or sending confirmation emails.

3. **Test your webhook:** Use Stripe's webhook testing feature to simulate events and ensure your webhook handler behaves as expected.

## Working with Prebuilt Checkout Forms

Stripe offers prebuilt checkout forms that simplify the payment process for your customers. These forms handle collecting payment details securely and are highly customizable to match your branding.

To work with prebuilt checkout forms:

1. **Create a Checkout Session:** Use the Stripe SDK to create a checkout session, specifying the details of the payment, such as the amount, currency, and success and cancel URLs.

2. **Redirect users to the Checkout Page:** After creating the checkout session, redirect your users to the provided URL. This will take them to the Stripe-hosted checkout page, where they can complete the payment process.

3. **Handle Checkout Completion:** Once the user completes the payment, they will be redirected back to your specified success URL. You can then handle the successful transaction asynchronously using webhooks.

## Transaction Statuses

Stripe transactions can have various statuses, each indicating a different stage of the payment process. Some common transaction statuses include:

- **Pending:** The payment is awaiting confirmation or processing.
- **Succeeded:** The payment has been successfully processed.
- **Failed:** The payment has failed due to an error or insufficient funds.
- **Refunded:** A portion or the entire payment has been refunded to the customer.
- **Disputed:** The customer has disputed the payment, and it's under review.

You can query transaction statuses using the Stripe API and handle them accordingly in your application.

This concludes the quickstart guide for integrating Stripe into your application. For more detailed information and advanced features, refer to the [Stripe documentation](https://stripe.com/docs).