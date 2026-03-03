import React from "react";

import {CONTACTS} from '../../lib/contacts'

export const ContactBlock = ({
    variant = "default", // default | mobile
}) => {
    return (
        <div
            className={
                variant === "mobile"
                    ? "mt-auto text-sm text-white/80"
                    : "text-sm"
            }
        >
            <div>{CONTACTS.city}</div>

            <a
                href={CONTACTS.addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:underline"
            >
                {CONTACTS.address}
            </a>

            <a
                href={`tel:${CONTACTS.phone}`}
                className="block mt-2 hover:opacity-80 transition-opacity"
            >
                {CONTACTS.phoneFormatted}
            </a>

            <a
                href={`mailto:${CONTACTS.email}`}
                className="block mt-2 hover:opacity-80 transition-opacity"
            >
                {CONTACTS.email}
            </a>

            {variant === "mobile" && (
                <div className="mt-4 text-xs">
                    {CONTACTS.about}
                </div>
            )}
        </div>
    );
};