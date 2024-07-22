import { Router } from 'express';
import {
  getCampaigns,
  createCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} from '../controllers/campaignController';
//import { fetchAllCampaigns/*, createCampaigns, updateCampaigns, deleteCampaigns */} from "../controllers/campaignController";

const router = Router();

router.get('/', getCampaigns);
router.get('/:id', getCampaignById);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);
router.post('/', createCampaigns);
/*router.post("/",createCampaigns);
router.put("/:id",updateCampaigns);
router.delete("/:id",deleteCampaigns);*/

export default router;
