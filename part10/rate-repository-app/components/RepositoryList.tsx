import { GET_REPOSITORIES } from "@/graphql/queries";
import useRepositories from "@/hooks/useRepositories";
import { formattedStats } from "@/utils/lib";
import { useQuery } from "@apollo/client";
import { FC } from "react";
import { FlatList, View, StyleSheet, Text, Image, TextStyle } from "react-native";
import { Link } from "react-router-native";
import { RepositoryEdge, RepositoryNode } from "types";

interface RepositoryItemProps {
  repository: RepositoryNode;
  view: "list" | "detail";
  children?: React.ReactNode;
}

export const repositoryItemTheme = {
  fullName: {
    fontSize: 16,
    fontWeight: "bold" as "bold",
  },
  description: {
    fontSize: 14,
    fontWeight: "300" as "300",
    marginTop: 6,
  }
}

export const styles = StyleSheet.create({
  container: {
    padding: 25,
    width: '100%',
  },
  separator: {
    height: 3,
    width: '100%',
    backgroundColor: "#e1e5e8",
    borderRadius: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
  },
  headerText: {
    paddingLeft: 10,
    flex: 1,
    maxWidth: '80%',
    ...repositoryItemTheme as TextStyle,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: "#0063e1",
    borderRadius: 5,
    padding: 4,
    paddingHorizontal: 15,
    marginTop: 8,
  },
  badgeText: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  repositoryStats: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    flexWrap: "wrap",
  },
  statText: {
    fontSize: 13,
    textAlign: "center",
  }
});

export const Stats = ({ count, label }: { count: number, label: string }) => {
  const formattedCount = formattedStats(count);

  return (
    <View style={styles.statsContainer}>
      <Text style={{
        fontWeight: "bold" as "bold",
        textAlign: "center",
        fontSize: 14,
      }}>
        {formattedStats(count)}
      </Text>
      <Text style={styles.statText}>
        {label}
      </Text>
    </View>
  )
}



export const RepositoryItem = ({ repository }: RepositoryItemProps) => {
  const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl } = repository;

  return (
      <View testID="repositoryItem" style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: ownerAvatarUrl || "" }} style={styles.image} />
          <View style={styles.headerText}>
            <Text style={repositoryItemTheme.fullName}>{fullName}</Text>
            <Text style={repositoryItemTheme.description}>{description}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{language}</Text>
            </View>
          </View>
        </View>
        <View style={styles.repositoryStats}>
          <Stats count={stargazersCount} label="Stars" />
          <Stats count={forksCount} label="Forks" />
          <Stats count={reviewCount} label="Reviews" />
          <Stats count={ratingAverage} label="Rating" />
        </View>
      </View>
  );
};

const RepositoryLink = ({ repository, children, view }: RepositoryItemProps) => {
  return (
    <Link 
      to={`/repository/${repository.id}`}
      style={{ backgroundColor: 'transparent' }}
      underlayColor="transparent"
    >
      <RepositoryItem repository={repository} view={view} />
    </Link>
  )
}

type TestRepositoryListProps = {
  testRepositories?: RepositoryEdge[];
}

export const ItemSeparator = () => <View style={styles.separator} />;
const RepositoryList: FC<TestRepositoryListProps> = ({ testRepositories }) => {
  const { repositories, loading, error } = useRepositories();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  const repositoryNodes = !testRepositories ? repositories?.edges.map((edge: RepositoryEdge) => edge.node) : testRepositories;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryLink repository={item} view="list" />}
    />
  );
};

export default RepositoryList;
