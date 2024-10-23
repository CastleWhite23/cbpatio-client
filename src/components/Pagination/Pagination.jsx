import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationComponent() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} variant="outlined" color="secondary" />
    </Stack>
  );
}

export {PaginationComponent}