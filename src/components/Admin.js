import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Admin.css';

const supabaseUrl = 'https://pzkdbludanipokuucwtj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6a2RibHVkYW5pcG9rdXVjd3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3ODAwNTcsImV4cCI6MjAzODM1NjA1N30.QbVYgsi8nh9519HGup_53-sz3LpgplH29qh8Kh4nFys';
const supadb = createClient(supabaseUrl, supabaseKey);

const AdminPanel = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [editingTable, setEditingTable] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('supabase_session'));
    if (session) {
      supadb.auth.setSession(session);
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  const handleLogin = async () => {
    const email = prompt('Please enter your email:');
    const password = prompt('Please enter your password:');
    if (email && password) {
      const { data, error } = await supadb.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
      } else {
        localStorage.setItem('supabase_session', JSON.stringify(data.session));
        setIsLoggedIn(true);
        fetchData();
      }
    }
  };

  const handleLogout = () => {
    supadb.auth.signOut();
    localStorage.removeItem('supabase_session');
    setIsLoggedIn(false);
    setData1([]);
    setData2([]);
  };

  const fetchData = async () => {
    const { data: data1, error: error1 } = await supadb
      .from('BRC KYC')
      .select('*');
    
    if (error1) {
      console.error('Error fetching BRC KYC data:', error1);
    } else {
      setData1(data1);
    }

    const { data: data2, error: error2 } = await supadb
      .from('BRC REDEMPTIONS')
      .select('*');

    if (error2) {
      console.error('Error fetching BRC REDEMPTIONS data:', error2);
    } else {
      setData2(data2);
    }
  };

  const handleEdit = (row, table) => {
    setEditingRow(row);
    setEditingTable(table);
  };

  const handleSave = async () => {
    const table = editingTable === 'BRC KYC' ? 'BRC KYC' : 'BRC REDEMPTIONS';
    const { data, error } = await supadb
      .from(table)
      .update(editingRow)
      .eq('id', editingRow.id);

    if (error) {
      console.error(`Error updating ${table}:`, error);
      alert(`Failed to update ${table}. Please try again.`);
    } else {
      setEditingRow(null);
      setEditingTable(null);
      fetchData();
    }
  };

  const handleDelete = async (row, table) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      const { error } = await supadb
        .from(table)
        .delete()
        .eq('id', row.id);

      if (error) {
        console.error(`Error deleting from ${table}:`, error);
        alert(`Failed to delete from ${table}. Please try again.`);
      } else {
        fetchData();
      }
    }
  };

  const handleProcess = async (row, table) => {
    const { data, error } = await supadb
      .from(table)
      .update({ processed: !row.processed })
      .eq('id', row.id);

    if (error) {
      console.error(`Error processing row in ${table}:`, error);
      alert(`Failed to process row in ${table}. Please try again.`);
    } else {
      fetchData();
    }
  };

  const renderTable = (data, tableName) => (
    <table className="admin-table">
      <thead>
        <tr>
          {data.length > 0 &&
            Object.keys(data[0]).map((header) => (
              <th key={header}>{header}</th>
            ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {data.map((row) => (
        <tr key={row.id} className={row.processed ? 'processed' : 'not-processed'}>
          {Object.keys(row).map((header) => (
            <td key={header} className={header === 'created_at' || header === 'eth_address' || header === 'eth_wallet' || header === 'withdrawal_address'? 'small-column' : ''}>
              {editingRow && editingRow.id === row.id && editingTable === tableName ? (
                <input
                  value={editingRow[header]}
                  onChange={(e) =>
                    setEditingRow({ ...editingRow, [header]: e.target.value })
                  }
                />
              ) : (
                header === 'created_at'
                  ? new Date(row[header]).toLocaleString()
                  : row[header]?.toString()
              )}
            </td>
          ))}
          <td>
            {editingRow && editingRow.id === row.id && editingTable === tableName ? (
              <button className="button button-edit" onClick={handleSave}>Save</button>
            ) : (
              <button className="button button-edit" onClick={() => handleEdit(row, tableName)}>Edit</button>
            )}
            <button className="button button-delete" onClick={() => handleDelete(row, tableName)}>Delete</button>
            <button className="button button-process" onClick={() => handleProcess(row, tableName)}>
              {row.processed ? 'Unprocess' : 'Process'}
            </button>
          </td>
        </tr>
      ))}

      </tbody>
    </table>
  );

  return (
    <div className="admin-panel">
      <h1>BRC Admin Panel</h1>

      {!isLoggedIn ? (
        <div className="login-section">
          <button className="button" onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <>
          <div className="logout-section">
            <button className="button" onClick={handleLogout}>Logout</button>
          </div>

          <div className="content-section">
            <h2>BRC Partner Registration</h2>
            {renderTable(data1, 'BRC KYC')}

            <h2>BRC Redemptions</h2>
            {renderTable(data2, 'BRC REDEMPTIONS')}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;