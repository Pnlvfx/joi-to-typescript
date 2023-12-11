import { existsSync, readFileSync, rmdirSync } from 'fs';

import { convertFromDirectory } from '../../index';

describe('description', () => {
  const typeOutputDirectory = './src/__tests__/description/interfaces';

  beforeAll(() => {
    if (existsSync(typeOutputDirectory)) {
      rmdirSync(typeOutputDirectory, { recursive: true });
    }
  });

  test('generates proper descriptions', async () => {
    const result = await convertFromDirectory({
      schemaDirectory: './src/__tests__/description/schemas',
      typeOutputDirectory,
      sortPropertiesByName: false,
      commentEverything: true
    });

    expect(result).toBe(true);

    const oneContent = readFileSync(`${typeOutputDirectory}/One.ts`).toString();
    expect(oneContent).toBe(
      `/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

/**
 * A schema with an example
 * @example
 * {
 *   "hello": "world"
 * }
 */
export interface DescriptionAndExample {
  /**
   * more
   */
  more: string;
}

/**
 * A schema with a short example
 * @example One liner
 */
export interface DescriptionAndShortExample {
  /**
   * more
   */
  more: string;
}

export interface DisableDescription {
  /**
   * thing
   */
  thing: string;
}

/**
 * DisableDescriptionObject
 */
export interface DisableDescriptionObject {
  /**
   * withDescription
   */
  withDescription?: {
    /**
     * A simple description
     */
    [x: string]: Example;
  };
  /**
   * withoutDescription
   */
  withoutDescription?: {
    [x: string]: Example;
  };
}

/**
 * A simple description
 */
export interface Example {
  /**
   * thing
   */
  thing: string;
}

/**
 * This is a long description.
 * There are many lines!
 *
 * And more here!
 */
export interface ExampleLong {
  /**
   * another
   */
  another: string;
}

/**
 * NoComment
 */
export interface NoComment {
  /**
   * more
   */
  more: string;
}
`
    );
  });
});
