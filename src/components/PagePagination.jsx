import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '12px',
  alignItems: 'center'
};

const paginationSx = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
  borderRadius: '999px',
  padding: '6px 10px',
  boxShadow: '0 6px 18px rgba(3, 20, 60, 0.12)',
  '& .MuiPaginationItem-root': {
    minWidth: 36,
    height: 36,
    margin: '0 4px',
    borderRadius: 8,
    fontWeight: 500,
    color: 'rgba(255,255,255,0.9)'
  },
  // selected item
  '& .Mui-selected': {
    background: 'linear-gradient(90deg,#1e88e5,#1976d2)',
    color: '#fff',
    boxShadow: '0 6px 18px rgba(25,118,210,0.24)'
  },
  // hovered item
  '& .MuiPaginationItem-root:hover': {
    background: 'rgba(255,255,255,0.04)'
  }
};

export default function PagePagination({ count = 1, page = 1, onChange }) {
  if (count > 500) count = 500; 
  return (
    <Stack spacing={2} sx={containerStyle}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        disabled={count === 1}
        color="primary"
        sx={paginationSx}
        shape="rounded"
      />
    </Stack>
  );
}