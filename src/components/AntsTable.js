import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native'
import styled from "styled-components/native"

const Card = styled.View`
  padding: 10px;
  margin: 16px 16px 0px 16px;
  border: 1px solid black;
  background-color: #ecf0f1;
  border-radius: 10px;
`
const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
`
const DataGroup = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 0;
`
const Field = styled.View`
  text-align: center;
`

const Label = styled.Text`
  font-size: 12px;
  text-align: center;
  color: gray;
`

const Value = styled.Text`
  font-size: 14px;
  text-align: center;
  font-weight: 700;
`

const AntSection = ({ item }) => {

    const likelihoodpercentage = (function () {
        if (!item["likelihood"]) return "-"
        const value = (item["likelihood"] * 100).toFixed(2)
        return value + "%"
    }())

    return (
        <Card key={item.name}>
            <Title>{item.name}</Title>
            <DataGroup>
                <Field>
                    <Value>{item.color}</Value>
                    <Label>COLOR</Label>
                </Field>
                <Field>
                    <Value>{item.length}</Value>
                    <Label>LENGTH</Label>
                </Field>
                <Field>
                    <Value>{item.weight}</Value>
                    <Label>WEIGTH</Label>
                </Field>
                <Field>
                    <Value>{item.loading ? "loading" : likelihoodpercentage}</Value>
                    <Label>LIKELIHOOD</Label>
                </Field>
            </DataGroup>
        </Card>
    )
        ;
}

const AntsTable = ({ data }) => {
    return (
        <FlatList
            data={data}
            renderItem={AntSection}
            keyExtractor={ant => ant.name}
        />
    )
}

export default AntsTable