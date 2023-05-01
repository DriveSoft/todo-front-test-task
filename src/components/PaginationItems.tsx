import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { ITodo } from "../types";

interface PaginationItemsProps {
  items: ITodo[]
  active: number;
  itemsPerPage: number;
  onClick: (page: number) => void;
}

export default function PaginationItems({ items, active, itemsPerPage, onClick }: PaginationItemsProps) {
  const itemsNumbers:JSX.Element[] = [];
  const pages = Math.ceil(items.length / itemsPerPage);

  for (let number = 1; number <= pages; number++) {
    itemsNumbers.push(
      <Pagination.Item key={number} active={number === active} onClick={() => onClick(number)}>
        {number}
      </Pagination.Item>      
    )
  }
 
  return (
    <Pagination>{itemsNumbers}</Pagination>
  )
}
