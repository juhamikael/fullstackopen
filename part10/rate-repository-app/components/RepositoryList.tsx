import useRepositories from "hooks/useRepositories";
import { FlatList, View, StyleSheet, Text, Image, TextStyle } from "react-native";
import { RepositoryNode } from "../types";

interface RepositoryItemProps {
  repository: RepositoryNode;
}

const repositoryItemTheme = {
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  separator: {
    height: 10,
    backgroundColor: "#e1e5e8",
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
    ...repositoryItemTheme as TextStyle,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: "#0063e1",
    borderRadius: 5,
    padding: 4,
    marginTop: 8,
  },
  badgeText: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: "column",
  },
  repositoryStats: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  }
});


const Stats = ({ count, label }: { count: number, label: string }) => {
  const formattedStats = (count: number) => {
    return count > 1000 ? `${Math.round(count / 100) / 10}k` : count;
  }

  return (
    <View style={styles.statsContainer}>
      <Text style={{
        fontWeight: "bold" as "bold",
        textAlign: "center",
      }}>
        {formattedStats(count)}
      </Text>
      <Text style={{
        textAlign: "center",
      }}>
        {label}
      </Text>
    </View>
  )
}

const RepositoryItem = ({ repository }: RepositoryItemProps) => {
  const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl } = repository;

  return (
    <View style={styles.container}>
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

const ItemSeparator = () => <View style={styles.separator} />;
const RepositoryList = () => {
  const { repositories } = useRepositories();
  const repositoryNodes = repositories?.edges.map(edge => edge.node) ?? [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
    />
  );
};

export default RepositoryList;
