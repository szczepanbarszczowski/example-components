import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { SecureStore } from 'expo';
import { Query, Mutation } from 'react-apollo';
import BasketScreen from '../../screens/Basket';
import LoadingIndicator from '../../components/LoadingIndicator';
import { basketQuery } from '../../graphQL/queries';

const checkoutLineItemsRemoveMutation = gql`
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
      userErrors {
        field
        message
      }
    }
  }
`;

class BasketContainer extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    checkoutId: '',
  }

  async componentWillMount() {
    const checkoutId = await SecureStore.getItemAsync('checkoutId');
    this.setState({ checkoutId });
  }

  onCheckoutPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Condiments');
  }

  render() {
    if (!this.state.checkoutId) return <LoadingIndicator />;
    return (
      <Query
        query={basketQuery}
        fetchPolicy="cache-and-network"
        variables={{ id: this.state.checkoutId }}
      >
        {({ data, loading }) => {
          if (loading) {
            return (
              <LoadingIndicator />
            );
          }
          return (
            <Mutation
              mutation={checkoutLineItemsRemoveMutation}
              refetchQueries={[{
                query: basketQuery,
                variables: { id: this.state.checkoutId },
              }]}
            >
              {(checkoutLineItemsRemove, { loading: removeFromBasketloading }) => (
                <BasketScreen
                  data={data}
                  removeFromBasketloading={removeFromBasketloading}
                  onItemRemove={checkoutLineItemsRemove}
                  checkoutId={this.state.checkoutId}
                  onCheckoutPress={this.onCheckoutPress}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default BasketContainer;
