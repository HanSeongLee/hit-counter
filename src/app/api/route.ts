import packageJson from 'package.json';

export async function GET(request: Request) {
    const { name, version } = packageJson;
    return new Response(JSON.stringify({ name, version }));
}
