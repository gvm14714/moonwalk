import React, { Component, useContext } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { TouchableOpacity, Linking } from "react-native";
import Searchbar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import Loader from "../common/Loader";
import { STATES } from "../constants";
import Search from "../stores/Search";
import { useSafeArea } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

const ContentWrapper = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

const Footer = styled.Text`
  font-size: 14px;
  margin: 20px 0;
`;

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const ResultCount = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
`;

const SearchScreen = observer(({ navigation }) => {
  const showDetails = data => {
    navigation.navigate("Details", { data });
  };
  const searchStore = useContext(Search);
  const {colors} = useTheme();
  const { results, searchLaunches, totalResults, state } = searchStore;
  return (
    <ContentWrapper>
      <Searchbar launchSearch={str => searchLaunches(str)} />
      <ScrollWrapper contentContainerStyle={{ alignItems: "center"}}>
        {state === STATES.LOADING && <Loader />}
        {results.length >= 0 && state === STATES.SUCCESS && (
          <>
            <ResultCount style={{color: colors.text}}>{totalResults || 0} results</ResultCount>
            {results.map(data => (
              <ResultCard
                key={data.id}
                data={data}
                showDetails={showDetails}
              />
            ))}
          </>
        )}
        <TouchableOpacity
          onPress={() => Linking.openURL("https://launchlibrary.net/")}
        >
          <Footer style={{color: colors.secondaryText}}>Data provided by the Launch Library</Footer>
        </TouchableOpacity>
      </ScrollWrapper>
    </ContentWrapper>
  );
})

export default SearchScreen;