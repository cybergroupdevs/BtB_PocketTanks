import AppController from './app';
import User from '../models/user';
import Post from '../models/post';

class Twitter extends AppController {
    constructor() {
        super();
    }

    async kpis(req, res) {
        try {
            const user = new User();
            const post = new Post();

            // Extracting userId from request body
            const userId = req.body.userId;

            // Fetching KPI's from db
            const postsCount = user.postsCount(userId);
            const likesCount = post.likesCount(userId);
            const commentsCount = post.commentsCount(userId);

            // forming response
            const responseData = {
                postsCount: postsCount,
                likesCount: likesCount,
                commentsCount: commentsCount
            };

            super.success(req, res, {
                statusCode: 200,
                message: "",
                data: responseData
            });
        } catch (error) {
            console.log(error.message);
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            });
        }
    }
}

export default new Twitter();