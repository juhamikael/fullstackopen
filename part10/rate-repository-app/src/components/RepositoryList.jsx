import { FlatList, View, StyleSheet, Text, Image } from "react-native";

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    marginVertical: 20
},
});

const repositories = [
  {
    id: "jaredpalmer.formik",
    fullName: "jaredpalmer/formik",
    description: "Build forms in React, without the tears",
    language: "TypeScript",
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
  },
  {
    id: "rails.rails",
    fullName: "rails/rails",
    description: "Ruby on Rails",
    language: "Ruby",
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
  },
  {
    id: "django.django",
    fullName: "django/django",
    description: "The Web framework for perfectionists with deadlines.",
    language: "Python",
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
  },
  {
    id: "reduxjs.redux",
    fullName: "reduxjs/redux",
    description: "Predictable state container for JavaScript apps",
    language: "TypeScript",
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = ({ repository }) => {
  return (
    <View>
      <Text>{repository.fullName}</Text>
      <Text>{repository.description}</Text>
      <Text>{repository.language}</Text>
      <Text>{repository.forksCount}</Text>
      <Text>{repository.stargazersCount}</Text>
      <Text>{repository.ratingAverage}</Text>
      <Text>{repository.reviewCount}</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: repository.ownerAvatarUrl }}
      />
    </View>
  );
};

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return <SingleRepository repository={item} />;
      }}
      // other props
    />
  );
};

export default RepositoryList;
