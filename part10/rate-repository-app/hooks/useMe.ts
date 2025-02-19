import { useQuery } from '@apollo/client';
import { GET_MY_INFO } from '@/graphql/queries';

const useMe = () => {
  const { data, loading, error } = useQuery(GET_MY_INFO, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    me: data?.me,
    loading,
    error
  };
};

export default useMe; 