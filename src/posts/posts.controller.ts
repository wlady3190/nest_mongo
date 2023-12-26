import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService){}

    @Post()
    createPost(@Body () createPostDto: CreatePostDto){
       return this.postsService.createPost(createPostDto)


    }



}
