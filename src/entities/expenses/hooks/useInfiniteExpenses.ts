// import { useInfiniteQuery} from '@tanstack/react-query';
// import {getExpenses, TGetExpensesResponse} from 'src/shared/api/expenseApi.ts';
// import { TEerrorResponse } from "src/shared/api/rootApi.ts"
// import useFiltersStoreForExpenses from 'src/entities/filters/models/store/FiltersStore.ts';
// import { TFilterForQueryTypes } from 'src/entities/filters/models/types/types.ts';
//
//
// function getMounthRange(date: Date) {
//   const start = new Date(date.getFullYear(), date.getMonth(), 1);
//   const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
//   return { start, end };
// }
//
// function useInfiniteExpenses() {
//   const filters = useFiltersStoreForExpenses.use.filter();
//
//   return useInfiniteQuery<TGetExpensesResponse, TEerrorResponse>({
//     queryKey: ["expenses-infinite", filters],
//     queryFn: async ({pageParam}) => {
//
//     }
//   })
// }
