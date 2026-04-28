import React, { useState, useEffect } from 'react';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    // Load items when page opens
    useEffect(() => {
        fetchItems();
    }, []);

    // Fetch all items from backend
    const fetchItems = async () => {
        try {
            const response = await fetch(`${API_URL}/items`);
            const data = await response.json();
            setItems(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching items:', err);
            setLoading(false);
        }
    };

    // Add new item
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });
            const savedItem = await response.json();
            setItems([...items, savedItem]);
            setNewItem({ name: '', description: '' });
        } catch (err) {
            console.error('Error adding item:', err);
        }
    };

    // Delete item
    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/items/${id}`, {
                method: 'DELETE'
            });
            setItems(items.filter(item => item._id !== id));
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>📦 Item Manager</h1>

            {/* Add Item Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    required
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    required
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                //Quantity
                <input
                    type="Number"
                    placeholder= "Quantity"
                    value={newItem.quantity}
                    //
                    />
                <button type="submit" style={{ padding: '8px 16px' }}>
                    Add Item
                </button>
            </form>

            {/* Items List */}
            <h2>Your Items:</h2>
            {items.length === 0 ? (
                <p>No items yet. Add one above!</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {items.map(item => (
                        <li key={item._id} style={{
                            border: '1px solid #ddd',
                            margin: '10px 0',
                            padding: '10px',
                            borderRadius: '5px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <strong>{item.name}</strong>
                                <p style={{ margin: '5px 0 0 0', color: '#666' }}>
                                    {item.description}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(item._id)}
                                style={{ background: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;