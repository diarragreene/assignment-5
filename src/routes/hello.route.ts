import { Get, Route, Path } from 'tsoa'

@Route('hello')
export class HelloRoute {
  @Get('{name}')
  public async sayHello (@Path() name: string): Promise<{ message: string }> {
    return { message: `Hello ${name}` }
  }
}
