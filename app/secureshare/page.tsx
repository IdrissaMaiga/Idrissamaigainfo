"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [salt, setSalt] = useState(''); // Salt is an empty string by default
  const [decryptMode, setDecryptMode] = useState(false);
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Added state for error messages
  const [copied, setCopied] = useState({ message: false, key: false, salt: false });
  const [expiry, setExpiry] = useState('24');

  useEffect(() => {
    generateNewKey();
  }, []);

  const generateNewKey = () => {
    const newKey = uuidv4();
    setEncryptionKey(newKey);
    return newKey;
  };

  const encryptMessage = () => {
    if (!message.trim()) {
      setErrorMessage('Please enter a message to encrypt.');
      return;
    }
    try {
      // Use the user-provided salt (or empty string if none provided)
      const saltToUse = salt || '';
      const saltedKey = CryptoJS.PBKDF2(encryptionKey, saltToUse, {
        keySize: 256/32,
        iterations: 1000
      }).toString();

      const encrypted = CryptoJS.AES.encrypt(message, saltedKey).toString();

      // Prepend the salt to the encrypted message (separated by a delimiter)
      const saltEncoded = CryptoJS.enc.Utf8.parse(saltToUse).toString(CryptoJS.enc.Base64);
      const combined = `${saltEncoded}:${encrypted}`;
      setEncryptedMessage(combined);
      setErrorMessage(''); // Clear any previous error messages

      const expiryHours = parseInt(expiry);
      if (expiryHours > 0) {
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + expiryHours);
        console.log(`Message will expire at: ${expiryDate.toISOString()}`);
      }
    } catch (error) {
      setErrorMessage('Encryption failed: An unexpected error occurred.');
      console.error('Encryption failed:', error);
    }
  };

  const decryptMessage = () => {
    if (!encryptedMessage || !encryptionKey) {
      setErrorMessage('Please provide both the encrypted message and the encryption key.');
      return;
    }
    try {
      // Extract the salt from the encrypted message
      const [saltEncoded, cipherText] = encryptedMessage.split(':');
      if (!saltEncoded || !cipherText) {
        setDecryptedMessage('');
        setErrorMessage('Decryption failed: Invalid message format.');
        return;
      }

      // Decode the salt from Base64
      const saltToUse = CryptoJS.enc.Base64.parse(saltEncoded).toString(CryptoJS.enc.Utf8);

      // Recompute the salted key using the extracted salt
      const saltedKey = CryptoJS.PBKDF2(encryptionKey, saltToUse, {
        keySize: 256/32,
        iterations: 1000
      }).toString();

      const decrypted = CryptoJS.AES.decrypt(cipherText, saltedKey).toString(CryptoJS.enc.Utf8);
      if (!decrypted) {
        setDecryptedMessage('');
        setErrorMessage('Decryption failed: Invalid key or message.');
      } else {
        setDecryptedMessage(decrypted);
        setErrorMessage(''); // Clear any previous error messages
      }
    } catch (error) {
      setDecryptedMessage('');
      setErrorMessage('Decryption failed: An unexpected error occurred.');
      console.error('Decryption failed:', error);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [type]: true });
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
    });
  };

  const resetForm = () => {
    setMessage('');
    setEncryptedMessage('');
    setDecryptedMessage('');
    setSalt(''); // Reset salt to empty string
    setErrorMessage(''); // Clear error message
    generateNewKey();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <Head>
        <title>Secure Message Encryption</title>
        <meta name="description" content="Encrypt your messages with strong encryption" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-6 px-8">
              <h1 className="text-3xl font-bold text-white">SecureShare</h1>
              <p className="text-blue-200 mt-1">End-to-end encrypted messaging</p>
            </div>

            <div className="flex border-b border-gray-700">
              <button 
                className={`flex-1 py-4 text-center font-semibold transition-colors duration-200 ${
                  !decryptMode 
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-900' 
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => setDecryptMode(false)}
              >
                Encrypt
              </button>
              <button 
                className={`flex-1 py-4 text-center font-semibold transition-colors duration-200 ${
                  decryptMode 
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-900' 
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => setDecryptMode(true)}
              >
                Decrypt
              </button>
            </div>

            <div className="p-8">
              {/* Display error message if it exists */}
              {errorMessage && (
                <div className="mb-6 bg-red-900 border-l-4 border-red-600 p-4">
                  <p className="text-sm text-red-200">{errorMessage}</p>
                </div>
              )}

              {!decryptMode ? (
                <>
                  <div className="mb-6">
                    <label className="block text-gray-200 font-medium mb-2">Your Message</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your sensitive message here..."
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-200 font-medium mb-2">Message Expiry</label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    >
                      <option value="1">1 hour</option>
                      <option value="12">12 hours</option>
                      <option value="24">24 hours</option>
                      <option value="48">48 hours</option>
                      <option value="168">7 days</option>
                      <option value="0">Never expire</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-200 font-medium mb-2">Salt (Optional)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100"
                      value={salt}
                      onChange={(e) => setSalt(e.target.value)}
                      placeholder="Enter a custom salt (optional)"
                    />
                    <p className="mt-2 text-sm text-gray-400">
                      A salt adds extra security to your encryption. It will be embedded in the encrypted message.
                    </p>
                  </div>

                  <div className="flex gap-4 mb-8">
                    <button
                      className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
                      onClick={encryptMessage}
                    >
                      Encrypt Message
                    </button>
                    <button
                      className="flex-1 px-6 py-3 bg-gray-600 text-gray-200 font-medium rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
                      onClick={resetForm}
                    >
                      Reset
                    </button>
                  </div>

                  {encryptedMessage && (
                    <>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-gray-200 font-medium">Encrypted Message</label>
                          <button
                            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            onClick={() => copyToClipboard(encryptedMessage, 'message')}
                          >
                            {copied.message ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg break-all text-sm font-mono border border-gray-600 text-gray-100">
                          {encryptedMessage}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-gray-200 font-medium">Encryption Key</label>
                          <button
                            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            onClick={() => copyToClipboard(encryptionKey, 'key')}
                          >
                            {copied.key ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg break-all text-sm font-mono border border-gray-600 text-gray-100">
                          {encryptionKey}
                        </div>
                      </div>

                      {salt && (
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-200 font-medium">Salt Used</label>
                            <button
                              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                              onClick={() => copyToClipboard(salt, 'salt')}
                            >
                              {copied.salt ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                          <div className="bg-gray-700 p-4 rounded-lg break-all text-sm font-mono border border-gray-600 text-gray-100">
                            {salt}
                          </div>
                        </div>
                      )}

                      <div className="bg-yellow-900 border-l-4 border-yellow-600 p-4 mb-6">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-yellow-200">
                              For better security, share the encrypted message and key separately through different channels.
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <label className="block text-gray-200 font-medium mb-2">Encrypted Message</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100"
                      rows={3}
                      value={encryptedMessage}
                      onChange={(e) => setEncryptedMessage(e.target.value)}
                      placeholder="Paste the encrypted message here..."
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-200 font-medium mb-2">Encryption Key</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100"
                      value={encryptionKey}
                      onChange={(e) => setEncryptionKey(e.target.value)}
                      placeholder="Paste the encryption key here..."
                    />
                  </div>

                  <div className="flex gap-4 mb-8">
                    <button
                      className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
                      onClick={decryptMessage}
                    >
                      Decrypt Message
                    </button>
                    <button
                      className="flex-1 px-6 py-3 bg-gray-600 text-gray-200 font-medium rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
                      onClick={resetForm}
                    >
                      Reset
                    </button>
                  </div>

                  {decryptedMessage && (
                    <div className="mb-6">
                      <label className="block text-gray-200 font-medium mb-2">Decrypted Message</label>
                      <div className="bg-green-900 border border-green-700 p-4 rounded-lg">
                        <p className="whitespace-pre-wrap text-gray-100">{decryptedMessage}</p>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
                <p>Powered by AES-256 encryption with PBKDF2 key derivation</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}