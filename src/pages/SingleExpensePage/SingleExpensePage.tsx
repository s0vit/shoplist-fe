import { useNavigate, useParams } from 'react-router-dom';
import useExpensesStore from 'src/entities/expenses/model/store/useExpensesStore.ts';
import styled from 'styled-components';
import useCategoryStore from 'src/entities/category/model/store/useCategoryStore.ts';
import usePaymentSourcesStore from 'src/entities/paymentSource/model/store/usePaymentSourcesStore.ts';
import _useUserStore from 'src/entities/user/model/store/useUserStore.ts';
import { useTranslation } from 'react-i18next';
import RoutesEnum from 'src/shared/constants/routesEnum.ts';
import getCurrencyLabel from 'src/utils/helpers/getCurrencyLabel.tsx';
import selectUserPaymentSources from 'src/entities/paymentSource/model/selectors/selectUserPaymentSources.ts';

const Container = styled.div`
  background-color: #1c1c1e;
  color: white;
  font-family: sans-serif;
  padding: 40px;
  max-width: 600px;
  margin: auto;
  border-radius: 16px;
`;

const Amount = styled.div`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Row = styled.div`
  background-color: #2c2c2e;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryLabel = styled.div<{ color?: string }>`
  color: ${({ color }) => (color ? color : 'white')};
`;

const PaymentSourceLabel = styled.div<{ color?: string }>`
  color: ${({ color }) => (color ? color : 'white')};
`;

const Comment = styled.div`
  background-color: #2c2c2e;
  border-radius: 10px;
  padding: 12px;
  border: none;
  color: white;
  width: 100%;
  margin-bottom: 25px;
  resize: none;
  height: 60px;
  font-family: sans-serif;
`;

const CurrencySection = styled.div`
  margin-bottom: 30px;
`;

const CurrencyTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const CurrencyList = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const CurrencyRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #2c2c2e;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const SingleExpensePage = () => {
  const params = useParams<{ _id: string }>();

  const navigate = useNavigate();

  const { t } = useTranslation('singleExpense');

  const expenses = useExpensesStore.use.userExpenses();
  const currentExpense = expenses.find((expense) => expense._id === params._id);

  const categoryList = useCategoryStore.use.userCategories();
  const currentCategory = categoryList.find((category) => category._id === currentExpense?.categoryId);

  const paymentSourceList = usePaymentSourcesStore(selectUserPaymentSources);
  const currentPaymentSource = paymentSourceList.find((source) => currentExpense?.paymentSourceId === source._id);

  const user = _useUserStore.use.user?.();

  const handleBackClick = () => {
    navigate(RoutesEnum.ROOT);
  };

  const handleEditClick = () => {
    alert(t('In process'));
  };

  return (
    <Container>
      <Amount>
        {currentExpense?.amount.toFixed(2) + ' '}
        {currentExpense?.currency && getCurrencyLabel(currentExpense?.currency)}
      </Amount>
      <Row>
        <div>{user?.login}</div>
      </Row>
      <Row>
        <CategoryLabel color={currentCategory?.color}>{currentCategory?.title}</CategoryLabel>
        <PaymentSourceLabel color={currentPaymentSource?.color}>{currentPaymentSource?.title}</PaymentSourceLabel>
      </Row>
      {currentExpense?.comments !== '' ? (
        <Comment>{currentExpense?.comments}</Comment>
      ) : (
        <Comment>{t('No comment added')}</Comment>
      )}
      <CurrencySection>
        <CurrencyTitle>{t('In other currencies')}</CurrencyTitle>
        <CurrencyList>
          {currentExpense?.exchangeRates &&
            Object.entries(currentExpense.exchangeRates).map(
              ([code, rate]) =>
                code !== currentExpense.currency && (
                  <CurrencyRow key={code}>
                    <div>{code}</div>
                    <div>{(rate * currentExpense.amount).toFixed(2)}</div>
                  </CurrencyRow>
                ),
            )}
        </CurrencyList>
      </CurrencySection>
      <ButtonsRow>
        <Button onClick={handleBackClick}>{t('Back')}</Button>
        <Button onClick={handleEditClick}>{t('Edit')}</Button>
      </ButtonsRow>
    </Container>
  );
};

export default SingleExpensePage;
