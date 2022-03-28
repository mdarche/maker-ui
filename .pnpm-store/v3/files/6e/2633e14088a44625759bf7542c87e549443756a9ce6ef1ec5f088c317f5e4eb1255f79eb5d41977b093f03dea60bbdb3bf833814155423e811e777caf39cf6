interface EnvVars {
    [varName: string]: string | undefined
}

type MockedEnvOptions =
    {
        clear: boolean
    } |
    {
        restore: boolean
    };

export type RestoreFn = () => void;

/**
 * Mocks the current 'process.env' environment specifying the given vars as values and returns a "Restore Function" that
 * when called, restores the environment values to the prior specified values.  Specifying 'undefined' for a value will
 * temporarily delete the environment variable (until the restore function is called).
 *
 * If the 'clear' option is specified, the current process.env is cloned and cleared before setting the values and
 * restored when the Restore Function is called.
 *
 * If the 'restore' option is specified, the current process.env is cloned before setting the values and restored when
 * the Restore Function is called
 *
 * Either 'clear' or 'restore' can be used to ensure variables set during the test by code under test does not
 * pollute the process environment.
 *
 * @param vars The environment variables to set (keys and values are both strings). Optional
 * @param options Object to specify 'clear' or 'restore' option. Optional
 * @return the Restore Function which should be called to restore the environment
 */
declare function mockedEnv(vars: EnvVars, options: MockedEnvOptions): RestoreFn;
declare function mockedEnv(options: MockedEnvOptions): RestoreFn;
declare function mockedEnv(vars: EnvVars): RestoreFn;

export default mockedEnv;
