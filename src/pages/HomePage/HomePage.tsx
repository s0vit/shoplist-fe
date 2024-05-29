import { Link } from 'react-router-dom';
import { RoutesEnum } from 'src/shared/constants/routesEnum.ts';
import { useQuery } from '@tanstack/react-query';
import { getExpenses } from 'src/shared/api/api.ts';

const HomePage = () => {
  const { data } = useQuery({ queryFn: getExpenses, queryKey: ['expenses'] });
  return (
    <div>
      <h1>Home Page</h1>
      <Link to={RoutesEnum.Profile}>Go to Profile</Link>
      <h2>Expenses</h2>
      <ul>
        {data?.map((expense) => (
          <li key={expense._id}>
            created:{expense.createdAt.toLocaleString()}
            <br />
            ammount:{expense.amount}
            <br />
            comments: {expense.comments}
            <br />
            categoryId:{expense.categoryId}
            <br />
            paymentSourceId:{expense.paymentSourceId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
