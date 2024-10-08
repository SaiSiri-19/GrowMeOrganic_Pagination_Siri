import React, { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { Checkbox } from 'primereact/checkbox';
import LoginForm from './LoginForm';


interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  date_start: number;
  date_end: number;
}

const ArtworksTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowCount, setRowCount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const op = useRef<OverlayPanel>(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchArtworks(page);
    }
  }, [page, isLoggedIn]);

  const fetchArtworks = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=5`);
      const data = await response.json();
      setArtworks(data.data);
      setTotalRecords(data.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (event: DataTableStateEvent) => {
    setPage(event.page !== undefined ? event.page + 1 : 1);
  };
  
  
  const onSelectRows = async () => {
    let selectedData: Artwork[] = [];
    let remainingRows = rowCount;
    let currentPage = 1;

    while (remainingRows > 0 && currentPage <= Math.ceil(totalRecords / 5)) {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=5`);
      const data = await response.json();
      const pageRows = data.data;

      if (remainingRows <= pageRows.length) {
        selectedData = [...selectedData, ...pageRows.slice(0, remainingRows)];
        remainingRows = 0;
      } else {
        selectedData = [...selectedData, ...pageRows];
        remainingRows -= pageRows.length;
      }

      currentPage++;
    }

    setSelectedRows(selectedData);
    op.current?.hide();
  };

  const headerTemplate = () => (
    <div style={styles.header}>
      <Checkbox
        checked={selectedRows.length === totalRecords}
        onChange={(e) => {
          if (e.checked) {
            onSelectRows();
          } else {
            setSelectedRows([]);
          }
        }}
      />
      <ChevronDownIcon style={styles.icon} onClick={(e) => op.current?.toggle(e)} />
      <OverlayPanel ref={op}>
        <div>
          <p>Enter number of rows to be selected:</p>
          <input
            type="number"
            value={rowCount}
            min={1}
            max={totalRecords}
            onChange={(e) => setRowCount(Number(e.target.value))}
          />
          <Button
            label="Submit"
            onClick={onSelectRows}
            style={styles.button}
          />
        </div>
      </OverlayPanel>
      <span>Title</span>
    </div>
  );

  const rowSelectionTemplate = (rowData: Artwork) => (
    <Checkbox
      checked={selectedRows.some((row) => row.id === rowData.id)}
      onChange={(e) => {
        if (e.checked) {
          setSelectedRows([...selectedRows, rowData]);
        } else {
          setSelectedRows(selectedRows.filter((row) => row.id !== rowData.id));
        }
      }}
    />
  );

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const footerTemplate = () => (
    <div style={styles.footer}>
      <span style={styles.footerText}>
        Selected: {selectedRows.length} / {totalRecords}
      </span>
    </div>
  );

  return (
    <div className="p-m-4">
      <div style={styles.titleContainer}>
        <h1 style={styles.titles}>GrowMeOrganic Pagination</h1>
      </div>
      <h2>Welcome, {userName}!</h2>
      <DataTable
  value={artworks}
  paginator
  rows={5}
  totalRecords={totalRecords}
  lazy
  onPage={onPageChange}
  loading={loading}
  selection={selectedRows}
  onSelectionChange={(e) => setSelectedRows(e.value as Artwork[])}
  selectionMode="multiple"
  footer={footerTemplate}
>
        <Column
          selectionMode="multiple"
          header={headerTemplate()}
          headerStyle={{ width: '20em' }}
          body={rowSelectionTemplate}
        />
        <Column field="title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="date_start" header="Date Start" />
        <Column field="date_end" header="Date End" />
      </DataTable>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    cursor: 'pointer',
    marginRight: '10px',
  },
  button: {
    backgroundColor: 'black',
    borderColor: 'black',
    color: 'white',
    padding: '0.2rem 1rem',
    marginLeft: '3rem',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  titles: {
    fontSize: '2.2rem',
    color: '#333',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderTop: '1px solid #ddd',
  },
  footerText: {
    fontSize: '1rem',
    color: '#333',
  },
};

export default ArtworksTable;
