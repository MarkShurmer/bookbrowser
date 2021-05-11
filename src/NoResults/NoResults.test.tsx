import { render } from "@testing-library/react"
import NoResults from "./NoResults"

describe('NoResults component', () => {
    it('should load with message', () => {
        const { getByText } = render(<NoResults />);

        expect(getByText('No results were found')).not.toBeNull();
    });
    
})
