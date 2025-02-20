import { GET_REPOSITORIES } from "@/graphql/queries";
import useRepositories from "@/hooks/useRepositories";
import { formattedStats } from "@/utils/lib";
import { FC, useState } from "react";
import { FlatList, View, StyleSheet, Text, Image, TextStyle, TextInput } from "react-native";
import { Button } from "react-native-paper"
import { Link } from "react-router-native";
import { RepositoryEdge, RepositoryNode } from "types";
import RepositorySort, { sortOptions, SortOption } from './RepositorySort';

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
  searchBar: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    height: 40,
    borderRadius: 30,
    color: "black",
    fontSize: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    marginTop: 20,
    alignSelf: 'center'
  },
  statText: {
    fontSize: 13,
    textAlign: "center",
  }

});

export const Stats = ({ count, label }: { count: number, label: string }) => {
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

const SearchBar = ({ onSearch }: { onSearch: (keyword: string) => void }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        placeholder="Search..."
        placeholderTextColor="gray"
        style={styles.searchBar}
        value={searchKeyword}
        onChangeText={setSearchKeyword}
    />
      <Button
        onPress={() => onSearch(searchKeyword)}
        style={{ padding: 5, width: 50 }}
        icon="magnify"
      >
        {""}
      </Button>
    </View>
  );
};

const RepositoryList: FC<TestRepositoryListProps> = ({ testRepositories }) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { repositories, loading, error } = useRepositories({
    orderBy: selectedSort.orderBy,
    orderDirection: selectedSort.orderDirection,
    searchKeyword,
  });

  if (loading) return null;
  if (error) return null;

  const repositoryNodes = !testRepositories ? repositories?.edges.map((edge: RepositoryEdge) => edge.node) : testRepositories;

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <SearchBar onSearch={setSearchKeyword} />
          <RepositorySort
            selectedSort={selectedSort}
            onSelect={setSelectedSort}
          />
        </View>
      }
      renderItem={({ item }) => <RepositoryLink repository={item} view="list" />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
