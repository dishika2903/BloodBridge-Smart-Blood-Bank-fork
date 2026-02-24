import { useState, useEffect } from 'react';
import { inventoryApi } from '../api/services';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    try {
      const res = await inventoryApi.getAll();
      setInventory(res.data || []);
    } catch (e) {
      setMessage({ type: 'error', text: e.message || 'Failed to load inventory' });
    } finally {
      setLoading(false);
    }
  }

  const startEdit = (item) => {
    setEditing(item.bloodGroup);
    setValue(item.unitsAvailable);
    setMessage({ type: '', text: '' });
  };

  const cancelEdit = () => {
    setEditing(null);
    setValue(0);
  };

  const saveEdit = async () => {
    if (editing == null) return;
    try {
      await inventoryApi.update(editing, value);
      setMessage({ type: 'success', text: 'Inventory updated.' });
      setEditing(null);
      loadInventory();
    } catch (e) {
      setMessage({ type: 'error', text: e.message || 'Update failed' });
    }
  };

  if (loading) {
    return (
      <div className="page-header">
        <h1>Inventory</h1>
        <p className="loading-msg">Loading…</p>
      </div>
    );
  }

  return (
    <div className="inventory-page">
      <div className="page-header animate-fade-in">
        <h1>Blood Inventory</h1>
        <p>View and update units by blood group</p>
      </div>

      <div className="glass-card animate-slide-up">
        {message.text && (
          <p className={`form-message ${message.type}`} style={{ marginBottom: '1rem' }}>
            {message.text}
          </p>
        )}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Blood Group</th>
                <th>Units Available</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.bloodGroup}>
                  <td><strong>{item.bloodGroup}</strong></td>
                  <td>
                    {editing === item.bloodGroup ? (
                      <input
                        type="number"
                        min="0"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      item.unitsAvailable
                    )}
                  </td>
                  <td>
                    {item.lastUpdated
                      ? new Date(item.lastUpdated).toLocaleString()
                      : '–'}
                  </td>
                  <td>
                    {editing === item.bloodGroup ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={saveEdit}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={cancelEdit}
                          style={{ marginLeft: '0.5rem' }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => startEdit(item)}
                      >
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
