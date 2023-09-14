import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { fetchCryptoDetails, fetchCryptoHistoricalData } from '../redux/cryptoSlice';

const formatPrice = (price) => {
  if (typeof price === 'number') {
    return price.toFixed(2);
  }
  return parseFloat(price).toFixed(2);
};

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector((state) => state.crypto.selectedDetails);

  useEffect(() => {
    dispatch(fetchCryptoDetails(id));
    dispatch(fetchCryptoHistoricalData(id));
    console.log(historicalData);
  }, [dispatch, id]);

  const historicalData = useSelector((state) => state.crypto.historicalData);

  const data = {
    labels: historicalData.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Price in USD',
        data: historicalData.map((entry) => entry.priceUsd),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div className="cryptoDetail">
      <Line data={data} />
      <h2>Crypto Detail</h2>
      <h3>{details ? details.name : 'Loading...'}</h3>
      <p>
        Symbol:
        {' '}
        {details ? details.symbol : 'Loading...'}
      </p>
      <p>
        Price (USD):
        {' '}
        {details ? formatPrice(details.priceUsd) : 'Loading...'}
      </p>
      <p>
        Rank:
        {' '}
        {details ? details.rank : 'Loading...'}
      </p>
      <p>
        Market Cap (USD):
        {' '}
        {details ? parseFloat(details.marketCapUsd).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Loading...'}
      </p>
      <p>
        24hr Volume (USD):
        {' '}
        {details ? parseFloat(details.volumeUsd24Hr).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Loading...'}
      </p>
    </div>
  );
};

export default CryptoDetails;
