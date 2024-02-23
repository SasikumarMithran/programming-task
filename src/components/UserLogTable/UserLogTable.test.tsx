import { render, fireEvent, waitFor } from '@testing-library/react';
import UserLogTable from './UserLogTable.component';

describe('UserLogTable', () => {
  it('should render the component correctly', () => {
    const { getByText } = render(<UserLogTable />);
    expect(getByText('Upload your Log file')).toBeInTheDocument();
  });

  it('should display network stats when log data is present', async () => {
    const { getByText, getByLabelText } = render(<UserLogTable />);
    const fileInput = getByLabelText('Upload your Log file');

    const file = new File(['fake log data'], 'example.log', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(getByText('Number of Unique IP Addresses:')).toBeInTheDocument();
      expect(getByText('Top 3 Most Visited URLs')).toBeInTheDocument();
      expect(getByText('Top 3 Most Active IP Addresses')).toBeInTheDocument();
    });
  });

});