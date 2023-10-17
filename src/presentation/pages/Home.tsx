import React, { useEffect, useState } from 'react';
import { getPodcasts } from '../../domain/services/podcast';
import {useRequest} from "../hooks/request";
import PodcastList from '../components/PodcastList';
import FilterBar from '../components/FilterBar';
import styled from 'styled-components';


function Home({className}: any) {
  const [filter, setFilter] = useState<string|null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const { setRequest } = useRequest();

  useEffect(() => {
    setRequest({ loading: true });
    getPodcasts()
      .then((response) => {
        console.log(response);
        setItems(response);
      })
      .finally(() => {
        setRequest({ loading: false });
      })
  }, []);

  useEffect(() => {
    if (!filter) {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(({ title, name }) => title.toLowerCase().includes(filter.toLowerCase()) || name.toLowerCase().includes(filter.toLowerCase())));
    }
  }, [items, filter]);

  return (
    <div className={className}>
      <FilterBar onFilterChange={(value:string) => setFilter(value)} itemsCount={items.length} />
      <PodcastList items={filteredItems} />
    </div>
  )
}

export default styled(Home)`

`;