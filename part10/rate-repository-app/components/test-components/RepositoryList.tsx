import { FlatList } from 'react-native';
import { RepositoryItem, ItemSeparator } from '@/components/RepositoryList';
import { RepositoryConnection } from '@/types';

type TestRepositoryListProps = {
  testRepositories?: RepositoryConnection;
}

const RepositoryList = ({ testRepositories }: TestRepositoryListProps) => {
  const { repositories } = { repositories: testRepositories }
  const repositoryNodes = repositories?.edges?.map((edge) => edge.node) ?? [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
    />
  );
};

export default RepositoryList;
