import stripePackage from 'stripe';
import handler from './libs/handler-lib';
import {calulateCost} from './libs/billing-lib';

export const main = handler(async (event,context) => {
    const { storage, source } = JSON.parse(event.body);
    const amount = calulateCost(storage);
    const description = "Scratch charge";
    const stripe=stripePackage(process.env.stripeSecretKey);
    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd"
    });
    return {status:true};
});