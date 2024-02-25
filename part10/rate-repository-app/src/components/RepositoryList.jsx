//src/components/RepositoryList.jsx
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";

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
  {
    id: "tailwindlabs.tailwindcss",
    fullName: "tailwindlabs/tailwindcss",
    description: "A utility-first CSS framework for rapid UI development.",
    language: "JavaScript",
    forksCount: 4039,
    stargazersCount: 76300,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/67109815?s=48&v=4",
  },
  {
    id: "tiangolo.fastapi",
    fullName: "tiangolo/fastapi",
    description: "FastAPI framework, high performance, easy to learn, fast to code, ready for production",
    language: "Python",
    forksCount: 5803,
    stargazersCount: 68381,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/1326112?s=48&v=4",
  },
];

const styles = StyleSheet.create({
  separator: {
    marginVertical: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;



const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return <RepositoryItem repository={item} />;
      }}
    />
  );
};

export default RepositoryList;
