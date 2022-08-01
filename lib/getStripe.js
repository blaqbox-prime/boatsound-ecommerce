import { loadStripe} from '@stripe/stripe-js'

let stripePromise;

const getStripe = () => {
    if(!stripePromise) {
        stripePromise = loadStripe('pk_test_51LCX8ZFAAnynwhcg2dqoiV1PTQ6jBSEdMsafBIiSvBe90NaJsomEc4XZd4dxVcoQM5DePCobrzN5M7bFAm1LGtqX00qdfFC0Sx');
    }

    return stripePromise;
}

export default getStripe;