import React, { useState } from 'react';
import { Dropdown, Badge, Button, ListGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function BtnNotification({ notifications = []}) {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <Dropdown show={showDropdown} onToggle={toggleDropdown} align="end">
            <Dropdown
                as={Button}
                variant="none"
                onClick={toggleDropdown}
                style={{ position: 'relative' }}
            >
                <FontAwesomeIcon icon={faBell}/>
                {notifications.length  > 0 && (
                    <Badge
                        pill
                        bg="danger"
                        style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            fontSize: '0.7rem'
                        }}
                    >
                        {notifications.length}
                    </Badge>
                )}
            </Dropdown>

            <Dropdown.Menu style={{ width: '300px', maxHeight: '400px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                    <Dropdown.ItemText>No new notifications</Dropdown.ItemText>
                ) : (
                    <ListGroup variant="flush">
                        {notifications.map((notification, index) => (
                            <ListGroup.Item key={index} action>
                                <small>{notification.time}</small>
                                <p className="mb-1">{notification.message}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}
