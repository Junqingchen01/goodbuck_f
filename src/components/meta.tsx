import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MetaProps {
    meta: {
        _id: string;
        Name: string;
        StartDate: string;
        EndDate: string;
        PlannedContribution: number;
        CurrentContribution: number;
        Description: string;
        Priority: number;
    };
    }

const Meta: React.FC<MetaProps> = ({ meta }) => {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>{meta.Name}</Text>
      <Text>Start Date: {meta.StartDate}</Text>
      <Text>End Date: {meta.EndDate}</Text>
      <Text>Planned Contribution: {meta.PlannedContribution}</Text>
      <Text>Current Contribution: {meta.CurrentContribution}</Text>
      <Text>Description: {meta.Description}</Text>
      <Text>Priority: {meta.Priority}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Meta;
