import gql from 'graphql-tag';

export const customerAddressDeleteMutation = gql`
    mutation customerAddressDelete(
        $customerAccessToken: String!,
        $id: ID!,
    ) {
        customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
            userErrors {
                field
                message
            }
        }
    }
`;

export const checkoutShippingAddressUpdateMutation = gql`
    mutation checkoutShippingAddressUpdate($shippingAddress: MailingAddressInput!, $checkoutId: ID!) {
        checkoutShippingAddressUpdate(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
            userErrors {
                field
                message
            }
        }
    }
`;

export const shippingMethodUpdateMutation = gql`
    mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
        checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
            userErrors {
                field
                message
            }
        }
    }
`;

export const checkoutCompleteWithTokenizedPaymentMutation = gql`
    mutation checkoutCompleteWithTokenizedPaymentV2($checkoutId: ID!, $payment: TokenizedPaymentInput!) {
        checkoutCompleteWithTokenizedPayment(checkoutId: $checkoutId, payment: $payment) {
            userErrors {
                field
                message
            }
        }
    }
`;

export const checkoutCompleteFree = gql`
    mutation checkoutCompleteFree($checkoutId: ID!) {
        checkoutCompleteFree(checkoutId: $checkoutId) {
            userErrors {
                field
                message
            }
        }
    }
`;

export const checkoutDiscountMutation = gql`
    mutation checkoutDiscountCodeApplyV2($checkoutId: ID!, $discountCode: String!) {
        checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) {
            userErrors{
                field
                message
            }
        }
    }
`;
