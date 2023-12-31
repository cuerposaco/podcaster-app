import React, { useEffect, useState } from 'react';
import { getPodcasts } from '../../domain/services/podcast';
import {useRequest} from "../hooks/request";
import PodcastList from '../components/PodcastList';
import FilterBar from '../components/FilterBar';
import styled from 'styled-components';

const filterItemsByText = (items: any[], str: string, keys:string[]): any[] =>
  items.filter(item => keys.some(key => item[key].toLowerCase().includes(str.toLowerCase())));


function PodcastsPage({className}: any) {
  const [filter, setFilter] = useState<string|null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const { setRequest } = useRequest();

  useEffect(() => {
    setRequest({ loading: true });
    getPodcasts()
      .then((response) => {
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
      setFilteredItems(filterItemsByText(items, filter, ['title', 'author']));
    }
  }, [items, filter]);

  return (
    <div className={className}>
      <FilterBar onFilterChange={(value: string) => setFilter(value)} itemsCount={filteredItems.length} />
      <PodcastList items={filteredItems} />
    </div>
  )
}

export default styled(PodcastsPage)``;